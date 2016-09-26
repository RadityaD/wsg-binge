$.ajax({
  type: 'GET',
  url: 'http://lobang.hol.es/4chanjsons/threads.json',
  contentType: 'text/plain',
  xhrFields: {
    withCredentials: false
  },
  success: function(data){
    addButtons(data);
    buttonClicked(data);
  }
});

function addButtons(data){
  var $themenu = $('#menu');
  var $thelinks = $('#links');

  for(var i in data){
    for(var j in data[i].threads){
      $.ajax({
        type: 'GET',
        url: 'http://lobang.hol.es/4chanjsons/'+data[i].threads[j].no+'.json',
        contentType: 'text/plain',
        xhrFields: {
          withCredentials: false
        },
        success: function(data){
          var buttonText = data.posts[0].sub !== undefined ? data.posts[0].sub:data.posts[0].com;

          var buttonNo = data.posts[0].no;

          $themenu.append(
            '<button id="'
            +buttonNo+'" class="btn btn-block"><h4>'
            +buttonText+'</h4></button>'
          );
        }
      });
    }
  }
}

function buttonClicked(data){
  var $themenu = $('#menu');
  var $thelinks = $('#links');

  $themenu.on('click', 'button', function(){
    var id = $(this).attr("id");
    $thelinks.html('');

    $.ajax({
      type: 'GET',
      url: 'http://lobang.hol.es/4chanjsons/'+id+'.json',
      contentType: 'text/plain',
      xhrFields: {
        withCredentials: false
      },
      success: function(data){
        console.log(data);
        console.log(data['posts'].length);

        var len = data['posts'].length;

        for(var i = 0; i < len; i++){
          var ThreadSelector = data.posts[i].sub;
          var ExtSelector = data.posts[i].ext;
          var TimSelector = data.posts[i].tim;
          var FNSelector = data.posts[i].filename;

          if(ExtSelector !== undefined){
            $thelinks.append(
                '<li><a href="https://i.4cdn.org/wsg/'
                +TimSelector+ExtSelector+'">'
                +FNSelector+ExtSelector+' - https://i.4cdn.org/wsg/'
                +TimSelector+ExtSelector+'</a></li>'
              );
          }
        }
      }
    });
  });
}
