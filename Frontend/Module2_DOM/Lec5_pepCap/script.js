let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photo");
let recordingState = false;
let constraints = {video:true};
let recordedData;
let mediaRecorder;

(async function(){
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoPlayer.srcObject = mediaStream; 
        mediaRecorder = new MediaRecorder(mediaStream);
        // so next we have attached functions to these events
        mediaRecorder.onstart = function(e){
            console.log("Inside on start !!");
            console.log(e);
        }
        mediaRecorder.onstop = function(e){
            console.log("Inside on stop !!");
            console.log(e);
        }
        mediaRecorder.ondataavailable = function(e){
            console.log("Inside on data available !!");
            recordedData = e.data;
            saveVideoToFs();
        }
        // attach click event on recordButton
        recordButton.addEventListener("click" , function(){
            if(recordingState){
                // stop the recording
                mediaRecorder.stop();
                recordButton.innerHTML = "Record";
            }
            else{
                //start the recording
                mediaRecorder.start();
                recordButton.innerHTML = "Recording";
            }
            recordingState = !recordingState;
        })
})();


function saveVideoToFs(){
    console.log("Saving Video");
    // file object in recordedData
    let videoUrl = URL.createObjectURL(recordedData ); // this is a bolb function which convert blob object into url
    console.log(videoUrl);

    let aTag = document.createElement("a"); // <a></a>
    aTag.download = "video.mp4";  //<a download ="video.mp4"></a>
    aTag.href = videoUrl; //<a download ="video.mp4" href = "href="blob:http://127.0.0.1:5500/8725040a-b68f-4a01-8377-d15059bf7c80"/"></a>

    //console.log(aTag);

    aTag.click(); 
    aTag.remove();
}