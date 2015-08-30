<?php
######################
#       bafoed       #
######################

set_time_limit(0);
@ini_set('max_execution_time', '0');
$myid        = '327120'; // свой айди
$id          = ''; // айди кого бекапим (только если не всех друзей)
$all_friends = false; // дампить всех друзей
$token       = ''; // Получить тут: http://oauth.vkontakte.ru/authorize?client_id=2626107&scope=16383&redirect_uri=http://api.vkontakte.ru/blank.html&response_type=token
$zip         = true; // зиповать (замедляет скорость работы)


/* ############### */
$messages = array();
function API($method, $sett)
{
    global $token;
    $ch = curl_init('https://api.vkontakte.ru/method/' . $method . '.json?' . http_build_query($sett) . '&access_token=' . $token);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}


function create_zip($files = array(), $destination = '', $overwrite = false)
{
    // ZIP архивация от http://davidwalsh.name/create-zip-php
    if (file_exists($destination) && !$overwrite) {
        return false;
    }
    $valid_files = array();
    if (is_array($files)) {
        foreach ($files as $file) {
            if (file_exists($file)) {
                $valid_files[] = $file;
            }
        }
    }
    if (count($valid_files)) {
        $zip = new ZipArchive();
        if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
        }
        foreach ($valid_files as $file) {
            $zip->addFile($file, $file);
        }
        $zip->close();

        return file_exists($destination);
    } else {
        return false;
    }
}


function dump($id)
{
    global $myid, $zip;
    $info      = API('getProfiles', array(
        'uid' => $id,
        'fields' => 'photo'
    ));
	if(empty($info['response'])) {
		die('<pre>Error</pre>');
	}

    $s_name    = $info['response'][0]['first_name']; //
    $s_surname = $info['response'][0]['last_name']; // -- Граббинг инфы о собеседнике
    $s_photo   = $info['response'][0]['photo']; // //
    $s_tabname = $s_name . " " . $s_surname;

    $info    = API('getProfiles', array(
        'uid' => $myid,
        'fields' => 'photo'
    ));
    $name    = $info['response'][0]['first_name']; //
    $surname = $info['response'][0]['last_name']; // -- Граббинг инфы о себе
    $photo   = $info['response'][0]['photo']; // //


    # Let`s get is started!
    $page  = API('messages.getHistory', array(
        'uid' => $id,
        'count' => '1'
    ));
    $count = (int) $page['response'][0]; // Количество сообщений с данным человеком

    $first      = $count % 100; // API позволяет получать не больше 100 сообщений за раз, сначала получим те, которые не получить при count = 100
    $iterations = ($count - $first) / 100; // Сколько раз получать по 100 сообщений

    $page = API('messages.getHistory', array(
        'uid' => $id,
        'count' => $first,
        'offset' => (string) ($iterations * 100)
    ));
    unset($page['response'][0]); // Количество сообшений мы уже знаем
    $messages = array_reverse(array_values($page['response'])); // ВК отдает сообщения сверху вниз


    for ($i = $iterations; $i >= 0; $i--) {
        $page = API('messages.getHistory', array(
            'uid' => $id,
            'count' => 100,
            'offset' => (string) ($i * 100)
        ));
        unset($page['response'][0]);
        $messages = array_merge($messages, array_reverse(array_values($page['response'])));
    }

    $page  = str_replace('%username%', $s_tabname, file_get_contents('head.tpl')); // Замена названия на вкладке
    $lines = array(); // Линии файла упрощенного стиля

    foreach ($messages as $msg) { // Обрабатываем каждое сообщение
        if ($msg['from_id'] == $myid) {
            $tname  = "$name $surname";
            $tphoto = $photo;
            $tid    = $myid;
        } else {
            $tname  = "$s_name $s_surname";
            $tphoto = $s_photo;
            $tid    = $id;
        }


        $body = $msg['body'];
        $date = (string) ((int) $msg['date'] + 3600);
        $time = date("d.m.Y H:i", $date);

        $lines[] = "$tname ($time): $body";
        $page .= <<<EOF
 <tr class="im_in">
      <td class="im_log_act">
        <div class="im_log_check_wrap"><div class="im_log_check"></div></div>
      </td>
      <td class="im_log_author"><div class="im_log_author_chat_thumb"><a href="http://vkontakte.ru/id$tid"><img src="$tphoto" class="im_log_author_chat_thumb"></a></div></td>
      <td class="im_log_body"><div class="wrapped"><div class="im_log_author_chat_name"><a href="http://vkontakte.ru/id$tid" class="mem_link">$tname</a></div>$body</div></td>
      <td class="im_log_date"><a class="im_date_link">$time</a><input type="hidden" value="$date"></td>
      <td class="im_log_rspacer"></td>
    </tr>
EOF;
    }
    $page .= file_get_contents('foot.tpl');


    file_put_contents($id . '.htm', iconv('utf-8', 'windows-1251//IGNORE', $page));
    file_put_contents($id . '.txt', iconv('utf-8', 'windows-1251//IGNORE', implode("\r\n", $lines)));
    if ($zip) {
        $add = array();
        $add = array_merge($add, glob("dialog_files/*"));
        $add = array_merge($add, array(
            $id . '.htm',
            $id . '.txt'
        ));
        create_zip($add, 'zip/dump-' . $id . '.zip');
        unlink($id . '.txt');
        unlink($id . '.htm');
    }
}

if ($all_friends) {
    $friends = API('friends.get', array());
    $friends = $friends['response'];

    foreach ($friends as $id) {
        dump($id);
    }
} else {
    dump($id);
}

echo '<pre>Completed.</pre>';
