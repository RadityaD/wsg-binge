<?php
  function fetchJSONs(){
    $url = "https://a.4cdn.org/wsg/threads.json";
    file_put_contents("threads.json", file_get_contents($url));

    $json = file_get_contents("threads.json");
    $array = json_decode($json, true);

    foreach($array as $arr){
      foreach($arr['threads'] as $obj){

        $nom = $obj['no'];
        $link = 'https://a.4cdn.org/wsg/thread/'.$nom.'.json';
        $fn = $nom.'.json';

        file_put_contents($fn, file_get_contents($link));
      }
    }
  }

  function pruneJSONs(){
    $files = glob('*.json');
    foreach($files as $file){
      if(is_file($file)){
        unlink($file);
      }
    }
  }

  pruneJSONs();
  fetchJSONs();
?>
