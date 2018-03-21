document.getElementById('upload-btn').onclick = function(){
    document.getElementById('upload-input').click();
    document.getElementById('progress-bar').setAttribute("style","width : 0%");
};

function empty_progress(){
    // document.getElementById('progress-bar').setAttribute("style","text : 0%");
    document.getElementById('progress-bar').setAttribute("style","width : 0%");
}

function send_request(body) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log('upload successful!' + this.responseText);
        }
    };

    request.onload = function(e) {
    };

    request.upload.addEventListener('progress',function(event){
        if(event.lengthComputable){
            let percentComlete = event.loaded / event.total;
            percentComlete = parseInt(percentComlete * 100);
            let text = percentComlete + '%';
            let width = percentComlete + '%';
            console.log(width);
            // document.getElementById('progress-bar').setAttribute("style","text :" + text);
            document.getElementById('progress-bar').setAttribute("style","width :" + width);
            if(percentComlete === 100) {
                document.getElementById('progress-bar').innerHTML = "Done";
            }
        }
    },false);

    request.open("POST", '/upload', false);
    request.send(body);
}

document.getElementById('upload-input').onchange = function () {
    let files_length = this.files.length;
    alert(files_length);
    if (files_length > 0) {
        let formData = new FormData();
        for (let i = 0; i < files_length; i++) {
            empty_progress();
            let file_name = this.files[i].name;
            let file = this.files[i];
            document.getElementById('progress-bar').innerHTML = "Uploading file : " + file_name;
            formData.append('uploads[]', file, file_name);
            send_request(formData);
        }
    }
    else {
        alert('give me file');
    }
};