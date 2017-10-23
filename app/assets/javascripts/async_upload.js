$(document).on("turbolinks:load", function(){
  let files_to_upload = [];
  
  $("#file_to_upload").change(function(){
    files_to_upload = []  
    let upload_files = $(this)[0].files;

    for(let count = 0; count < upload_files.length; count++) {
      readfile(upload_files[count], function(filecontent){
        files_to_upload.push({
          fileName: upload_files[count].name,
          fileContent: filecontent
        });
      });
    }
  });


  $("button#send_file").click(function(){ 
    $.post("/async_uploads", { files: files_to_upload }, function(){
      alert("yahoo!");
    }).fail(function(){
      alert("ouch!")
    });
    
  });
});


function readfile(file, callback_exec) {
  let reader = new FileReader();

  reader.onload = function(e) {
    callback_exec(e.target.result)
  }

  reader.readAsDataURL(file);
}
