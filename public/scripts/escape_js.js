

    var aaa = '';

    function initiate(assistantid) {
      //alert('SPN initiate '+assistantid);
      var url = "initiate";
      var jsondata = { assistant_id: assistantid };
      
      ajaxJSONPosta(url, jsondata, function(response) {
        // alert(JSON.stringify(response.result)); 
        sessionid = response.result.session_id;
        userrole = response.role;

        historyArea.value += sessionid.trim() + '\n';
        historyArea.scrollTop = historyArea.scrollHeight;
        //alert(sessionid); 
        // sendConverse("Jargon of the day");
      });
    }   

    function ajaxJSONPostb(url, jsondata, callback) {
      //alert('ajaxJSONPost');
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      //xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://botalicious.herokuapp.com');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Received response=" + xhr.responseText);

            alert('SPN in ajaxJSONPosta*** '+ xhr.responseText);

            callback(xhr.responseText);

        } else {

          //alert("Return status = " + xhr.status);
          document.getElementById('tcon').value = "Return status = " + xhr.status;
        }
      }
      xhr.send(JSON.stringify(jsondata));
      //alert('after Send '+JSON.stringify(jsondata));
      //console.log("Sent to "+url+", data=" + JSON.stringify(jsondata));
    }    



var input = document.querySelector('input[type=file]'); // see Example 4

input.onchange = function () {
  var file = input.files[0];

  //upload(file);
  //drawOnCanvas(file);   // see Example 6
  displayAsImage(file); // see Example 7
};

function upload(file) {
  var form = new FormData(),
      xhr = new XMLHttpRequest();

  form.append('image', file);
  xhr.open('post', 'server.php', true);
  xhr.send(form);
}

function drawOnCanvas(file) {

  //alert(file);
  var reader = new FileReader();

  reader.onload = function (e) {
    var dataURL = e.target.result,
        c = document.querySelector('canvas'), // see Example 4
        ctx = c.getContext('2d'),
        img = new Image();

    img.onload = function() {
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = dataURL;
  };

  reader.readAsDataURL(file);
} 

function displayAsImage(file) {
  var imgURL = URL.createObjectURL(file),
      img = document.createElement('img');

  img.onload = function() {
    URL.revokeObjectURL(imgURL);
  };

  img.src = imgURL;
  document.getElementById("cmsImg").src = img.src;
  document.body.appendChild(img);
}


      var controller = null;
      var player = document.getElementById('player'); 
      // var snapshotCanvas = document.getElementById('snapshot');
      var captureButton = document.getElementById('capture');
      var video1 = document.getElementById("usrVideo");
      var videoTracks;
      //videoTracks.forEach(function(track) {track.stop()});
      var canStream;
      var theStream;
      var theRecorder;
      var recordedChunks1 = [];     
      var responseText = ""; 
      // var ctx = snapshotCanvas.getContext("2d");
      
      
      var handleSuccess = function(stream) {
          // Attach the video stream to the video element and autoplay.
          theStream = stream;
          player.srcObject = stream;
          player.captureStream = player.captureStream || player.mozCaptureStream;
          videoTracks = stream.getVideoTracks();
        try {
          recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
        } catch (e) {
          console.error('Exception while creating MediaRecorder: ' + e);
          return;
        }
        theRecorder = recorder;
        recorder.ondataavailable = 
            (event) => { recordedChunks1.push(event.data); };
        // recorder.start(10);      
      };

      // var handleSuccess = function(stream) {
      //   // Attach the video stream to the video element and autoplay.
      //   player.srcObject = stream;
      //   videoTracks = stream.getVideoTracks();
      // };
      function download() {
      theRecorder.stop();
      // theStream.getTracks().forEach(track => { track.stop(); });

      const clipName = inputText.toUpperCase().substr(5);
      //alert(clipName);
      
        const clipContainer = document.createElement('article');
        const clipLabel = document.createElement('p');
        const video = document.createElement('video');
        const deleteButton = document.createElement('button');
        const downloadButton = document.createElement('button');

        clipContainer.classList.add('clip');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('loop', 'false');
        video.setAttribute('controls', 'true');
        video.setAttribute('type', 'video/webm');
        //audio.setAttribute('type', 'video/webm');
        //audio.setAttribute('src', '/chords/drum120.wav');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        downloadButton.textContent = 'Download';
        downloadButton.className = 'download';

        clipContainer.appendChild(video);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        clipContainer.appendChild(downloadButton);
        tcon.appendChild(clipContainer);

      video.controls = true;

      var blob = new Blob(recordedChunks1, {type: "video/webm"});
      //recordedChunks[];
      var url =  URL.createObjectURL(blob);

      var mUrl = url.slice(-36).replace(/-/g, "");


      video.src = url;

      alert(mUrl);

          var formdata = { issue: url, buildingName: clipName, weekDay: 'fi03value', dayTime: 'fi04value', phone: 'test.webm' };

         //  var aurl = "http://localhost:3001/saveav";

          // ajaxJSONPosta(aurl, formdata, function(mresult) {

          //     responseText = JSON.stringify(mresult);
          //     alert(responseText);

          // });

      deleteButton.onclick = function(e) {
        let evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }
      // function xhrAttach(url, data, callback, errback)
      // {
      //  //alert('SPNURL '+ url);
      //  var xhr = new createXHR();
      //  xhr.open("POST", url, true);
      //  xhr.setRequestHeader("Content-type", "multipart/form-data");
      //  xhr.onreadystatechange = function(){
      //    if(xhr.readyState == 4){
      //      if(xhr.status == 200){
      //        callback(parseJson(xhr.responseText));
      //      }else{
      //        errback('service not available');
      //      }
      //    }
      //  };
      //  xhr.timeout = 1000000;
      //  xhr.ontimeout = errback;
      //  xhr.send(data);
      // }
          

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = 'test.webm';
      a.click();
      // setTimeout() here is needed for Firefox.
      setTimeout(function() { URL.revokeObjectURL(url); }, 100); 
      // toggleAppInfo();
      return;
    }
      function snapClick() {

        siteControls('snapClick');

        return;

        var context = snapshot.getContext('2d');
        context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
      //ImgData = context.getImageData(0, 0, snapshotCanvas.width, snapshotCanvas.height);
        var fullQuality = snapshotCanvas.toDataURL("image/jpeg", 1.0);


        var image = new Image();
        image.src = snapshotCanvas.toDataURL("image/png");
      //alert(fullQuality);

        document.getElementById("cmsImg").src = image.src;     

        snapshotCanvas.toBlob(function(blob) {
          //var newImg = document.createElement("cframe"),
          burl = URL.createObjectURL(blob);

          //alert('BURL ' + burl);


          //alert('IN SPN Capture');
          var imgg = document.getElementById("snapshot").toDataURL("image/jpeg", 1.0);
          //alert(imgg);
          var url = "https://spnize.mycloud.net/captureImage";
          var jsondata = { requestId: "12345678", persona: "Hello", name: "Sridhar", value: "SSSSSS",base64: imgg, mUrl: burl }; //, base64: imgg mUrl: burl

                ajaxJSONPost(url, jsondata, function(response) {
                 // alert(JSON.stringify(response));

                    //responsiveVoice.speak(response.successDetails.conversationText);
                    //historyArea.value += 
                    //  response.successDetails.conversationText + "\n";
                    //historyArea.scrollTop = historyArea.scrollHeight; 
                });

                function ajaxJSONPost(url, jsondata, callback) {
                  var xhr = new XMLHttpRequest();
                  xhr.open("POST", url);
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.setRequestHeader("Cache-Control", "no-cache");
                  //xhr.setRequestHeader("X-File-Name", file.jsondata);
                  //xhr.setRequestHeader("X-File-Size", file.jsondata);
                  //xhr.setRequestHeader("Content-Type", "multipart/form-data");
                  xhr.onreadystatechange = function() {
                  if (xhr.readyState == 4 && xhr.status == 200) {
                      console.log("Received response=" + xhr.responseText);
                      callback(JSON.parse(xhr.responseText));
                    }
                    else {
                      document.getElementById('statusLine').value = "Return status = "+xhr.status;
                    }
                  }
                  xhr.send(JSON.stringify(jsondata));
                  console.log("Sent to "+url+", data=" + JSON.stringify(jsondata));
                }


            });


      }


      //navigator.mediaDevices.getUserMedia({video: { facingMode: "user" }}).then(handleSuccess).catch(handleError);

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 100, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.getElementById("chatInput").focus();
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


function chglang(){
  var nde = document.getElementById('chglang');
  nde.style.display = nde.style.display == 'none' ? '' : 'none';
  if (nde.style.display == '') {
    document.getElementById("chglang").style.display = 'block';

  } else {
    document.getElementById("chglang").style.display = 'none';

  }

}


function toggleAppInfo(){
    var node = document.getElementById('appinfo');
  
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
  // hasGetUserMedia();
  if (hasGetUserMedia()) {
  // Good to go!
    document.getElementById("dskinp").style.display = 'block';
    //alert('Good to go!');
    document.getElementById("mobinp").style.display = 'none';
  } else {
    //alert('getUserMedia() is not supported by your browser');
    document.getElementById("mobinp").style.display = 'block';
    document.getElementById("dskinp").style.display = 'none';
  }

    node.style.display = node.style.display == 'none' ? '' : 'none';
    if (node.style.display == '') {
        navigator.mediaDevices.getUserMedia({video: true}).then(handleSuccess);
    } else {
        videoTracks.forEach(function(track) {track.stop()});
    }
    
}   


function qrcode() {
  ctr = ctr+1;

  let bid = 'btn'+ctr.toString();

  var btn = document.createElement("button");
  btn.setAttribute("class", "accordion");
  btn.setAttribute("id", bid);
  btn.setAttribute("onclick","myFunction()");

  var t = document.createTextNode(inputText);
  btn.appendChild(t);
  //para.appendChild(btn);
  document.getElementById("tcon").appendChild(btn);
  
  var dv = document.createElement("DIV");
  dv.setAttribute("class", "panel");
  dv.setAttribute("style", "display: block;");
  dv.setAttribute("ID", "qrcode");

  var tt = document.createTextNode("QR Code Response");
  dv.appendChild(tt);
  document.getElementById("tcon").appendChild(dv);




  let cvsid = 'can-'+ctr.toString();


  var can = document.createElement("DIV");
  // can.setAttribute("style", "width:100%;")

  can.setAttribute("ID", cvsid);


  dv.appendChild(can);
  document.getElementById("tcon").appendChild(dv);


  const myList = document.querySelector('#tcon')
  const lastListItem = myList.lastElementChild;
  myList.insertBefore(lastListItem, myList.firstElementChild)
  const lastListItem2 = myList.lastElementChild;
  myList.insertBefore(lastListItem2, myList.firstElementChild)

  // Get the URL of the current page
  var currentURL = window.location.href;

  // Generate QR code using the URL
  var qrcode = new QRCode(document.getElementById(cvsid), {
    text: currentURL,
    width: 128,
    height: 128
  });

  inputText = "";
  return;
}

function saveFunc(){
  alert('empty implementation');
  
}

function swapVideo() {

  //alert('vid src',vid.src);

  if (vid.src==""){
      cmsImg.src = usrImg.src;
      document.getElementById("cmsImg").src = "";
      document.getElementById("cmsImg").style.display = "block";
  }
  if (vid.style.display == "block" ) 
  { 
      vidct=vid.currentTime;
      uvid.src = vid.src;
      
      vid.style.display = "none";
      //vid.load();
      uvid.style.display = "block";
      uvid.currentTime=vidct;
      //uvid.load();


  } 
  if (uvid.src=="s"){
      usrImg.src = cmsImg.src;
      document.getElementById("usrImg").src = usrImg.src;
      document.getElementById("usrImg").style.display = "block";   
  
    if (uvid.style.display == "block" ){

      uvidct=uvid.currentTime;
      vid.src = uvid.src;
      vid.style.display = "block";
      vid.currentTime=uvidct;
      //vid.load();
      uvid.style.display = "none";
      //uvid.load();

    }
    if (uvid.style.display == "none" ){

      uvidct=uvid.currentTime;
      vid.src = uvid.src;
      vid.style.display = "block";
      vid.currentTime=uvidct;
      //vid.load();
      uvid.style.display = "none";
      //uvid.load();
    }    
  }
}

function showAVControl() {
    if (document.getElementById("vdo").style.display == "block" ) 
    {
        document.getElementById("vdo").style.display = "none";
    } else {
        document.getElementById("vdo").style.display = "block";
    }
}
function showMic() {
    if (document.getElementById("panel").style.display == "block" ) 
    {
        document.getElementById("panel").style.display = "none";
    } else {
        document.getElementById("panel").style.display = "block";
    }
}


function show_send_btn(style) {
  if (chatInput.value.length == 0) {
    //send_button.style.display = 'none';
  } else {
    //send_button.style.display = 'block';
  }
  
}


var vid = document.getElementById("myVideo");
var uvid = document.getElementById("usrVideo");


function playVid() {
    //vid.play();
    chatInput.value = 'play video';
    document.getElementById("chatInput").focus();
    btn_play.style.display = 'none';
    btn_pause.style.display = 'inline-block';
    show_send_btn()
}
function pauseVid() {
    //vid.pause();
    chatInput.value = 'pause video';
    document.getElementById("chatInput").focus();
    btn_play.style.display = 'inline-block';
    btn_pause.style.display = 'none';
    show_send_btn()
}
function setFullVolume() { 
    vid.volume = 1.0;
} 
function enableMute() { 
    //vid.muted = true;
    chatInput.value = 'mute sound';
    document.getElementById("chatInput").focus();
    btn_mute.style.display = 'none';
    btn_sound.style.display = 'inline-block';
    show_send_btn()
}
function disableMute() {
    //vid.muted = false;
    chatInput.value = 'enable sound';
    document.getElementById("chatInput").focus();
    btn_mute.style.display = 'inline-block';
    btn_sound.style.display = 'none';
    show_send_btn()
}

    var globalSessionId = "uninitialized";
    var imagePlayInterval = 15000; // 15 secs default
    var globalContentJsonObj;
    var historyArea = document.getElementById('historyArea');
    historyArea.value = '';
    var jsonUri = '';
    var assistantid = 'b51117b9-3e1c-4777-a2ff-22849f8add4a';
    // var assistantid = 'e002427d-6b2b-4076-9887-f5b0fe757c79';
    var sessionid ='';
    
    function ajaxJSONPost(url, jsondata, callback) {
     // alert('ajaxJSONPost');
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      //xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://botalicious.herokuapp.com');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log("Received response=" + xhr.responseText);

          //alert('in ajaxJSONPost '+xhr.responseText);

          callback(JSON.parse(xhr.responseText));
        }
        else {

          //alert("Return status = " + xhr.status);
            document.getElementById('statusLine').value = "Return status = " + xhr.status;
        }
      }
      xhr.send(JSON.stringify(jsondata));
      //alert('after Send '+JSON.stringify(jsondata));
      console.log("Sent to "+url+", data=" + JSON.stringify(jsondata));
    }
    
    function kathaInitiate() {

      var url = BASE_KATHA_URL + "/initiate";
      var jsondata = { requestId: "12345678", persona: "Boy1" };
      
      ajaxJSONPost(url, jsondata, function(response) {
        globalSessionId = response.sessionId;
       // alert(JSON.stringify(response));
          jsonUri = BASE_CMS_URL + '/' + response.successDetails.contentUri;

          alert(jsonUri);

          aloadJson(jsonUri, response);

      });
    }
    



    function ajaxJSONPosta(url, jsondata, callback) {
      //alert('ajaxJSONPost');
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      //xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://botalicious.herokuapp.com');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log("Received response=" + xhr.responseText);

          //alert('in ajaxJSONPosta*** '+xhr.responseText);

          callback(JSON.parse(xhr.responseText));
        }
        else {

          //alert("Return status = " + xhr.status);
            document.getElementById('statusLine').value = "Return status = " + xhr.status;
        }
      }
      xhr.send(JSON.stringify(jsondata));
      //alert('after Send '+JSON.stringify(jsondata));
      console.log("Sent to "+url+", data=" + JSON.stringify(jsondata));
    }

  var formFlg1 = false;
  var formURL = "";
  var ncnt = 0;
  var html='';
  var ot = "";
  var ctr = 0;
  var bid = '';
  var userMessage = '';
  var baseUrl = 'http://127.0.0.1:5000/process-message';
  var i=0;
  var j, x = "";
  var mtg = false;

  // const populateBotResponse = async (userMessage) => {
  //   await showBotLoadingAnimation();
  //   const response = await processUserMessage(userMessage);
  //   responses.push(response);

  //   const repeatButtonID = getRandomID();
  //   botRepeatButtonIDToIndexMap[repeatButtonID] = responses.length - 1;
  //   hideBotLoadingAnimation();
  //   // Append the random message to the message list
  //   $("#message-list").append(
  //     `<div class='message-line'><div class='message-box${
  //       !lightMode ? " dark" : ""
  //     }'>${
  //       response.openaiResponseText
  //     }</div><button id='${repeatButtonID}' class='btn volume repeat-button' onclick='playResponseAudio("data:audio/wav;base64," + responses[botRepeatButtonIDToIndexMap[this.id]].openaiResponseSpeech);console.log(this.id)'><i class='fa fa-volume-up'></i></button></div>`
  //   );

  //   playResponseAudio("data:audio/wav;base64," + response.openaiResponseSpeech);

  //   scrollToBottom();
  // };

    function loginFunc(inputText) {
            window.location.href = "/ibm/cloud/appid/rop/login";

            // alert('Login >> '+inputText);
            // jsonUri = "cms/content/json/red_riding_hood_summary.json";
            // alert(jsonUri);
            // // aloadJson(jsonUri, response);
            return;
    }

    function sendConverse(inputText) {

      // uvid.src="./public/alice.mp4";

      siteControls(inputText);
      if (inputText.toUpperCase().trim() == "SIGNUP" || inputText.toUpperCase().trim() == "SIGN UP")  {
          window.location.href = "/ibm/cloud/appid/view/sign_up";
          return;
      } 
      if (inputText.toUpperCase().trim() == "LOGIN" )  {
          window.location.href = "/ibm/cloud/appid/rop/login";
          return;
      } 

      if (inputText.toUpperCase().trim() == "QRCODE") {
        inputText = "Steps to scan the QR Code displayed using a mobile device"
      }
      if (inputText.toUpperCase().trim() == "START SOD") {
        // document.getElementById("toggle").click();
        mtg = true;
        recordBtn.click();
        
        // inputText = "CHART";
        return;
      }
      if (inputText.toUpperCase().trim() == "STOP SOD" ) {
        // document.getElementById("toggle").click();
        // alert(storedValues.length);
        if (mtg) {
          document.getElementById("toggle").click();
          cmsImg.src=""; 
          cmsImg.src=""; 
          document.getElementById("usrVideo").style.display = "block";
          document.getElementById("panel").style.display = "block";
          recordBtn.click();
        }
        inputText = "";
        return;

      }
      if (inputText.toUpperCase().trim() == "CHART") {
        document.getElementById("toggle").click();
        cmsImg.src=""; 
        document.getElementById("usrVideo").style.display = "none";
        document.getElementById("panel").style.display = "none";
        // recordBtn.click();
        inputText = "Please Explain the Incident details in the displayed Bar Chart ";
        return;
      }
      if (inputText.toUpperCase().trim() == "CANVAS") {
        Shp = "onload"
        document.getElementById("toggle").click();
        return;
      }
      if (inputText.toUpperCase().trim() == "USE CASES") {
        Shp = "usecase"
        document.getElementById("toggle").click();
        setTimeout('cloadJson("' + BASE_CMS_URL + '/content/json/aiusecases.json")', 100);

        return;
      }
      if (inputText.toUpperCase().trim() == "INTRO") {
        Shp = "intro"
        // document.getElementById("toggle").click();
        setTimeout('loadJson("' + BASE_CMS_URL + '/content/json/escape101.json")', 100);

        return;
      }
      if (inputText.toUpperCase().substr(0,10) == "FILL COLOR") {
        Fc = inputText.toUpperCase().substr(11);
        return;
      }
      if (inputText.toUpperCase().substr(0,12) == "STROKE COLOR") {
        Sc = inputText.toUpperCase().substr(13);
        return;
      }
      if (inputText.toUpperCase().substr(0,11) == "STROKE SIZE") {
        Ss = float(inputText.toUpperCase().substr(12));
        strokeWeight(Ss);
        return;
      }
      if (inputText.toUpperCase().substr(0,9) == "TEXT SIZE") {
        Ts = float(inputText.toUpperCase().substr(10));
        textSize(Ts);
        return;
      }          
      if (inputText.toUpperCase() == "CLEAR") {
        Cd = 0;
        Shp = '';
        nText = '';
        document.getElementById("chatInput").focus();
        return;
      }
      if (inputText.toUpperCase() == "CLEAR CANVAS") {
        clear();
        return;
      } 
      if (inputText.toUpperCase() == "CLEAR ALL") {
        Cd = 0;
        Shp = '';
        nText = '';
        var list = document.getElementById("tcon");
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        clear();
        document.getElementById("chatInput").focus(); 
        return;
      } 
      if (inputText.toUpperCase().substr(0,8) == "QCIRCLE(") {

        // alert(inputText.toUpperCase().substr(0,8));
        var ltxt = inputText.toUpperCase().length-8;
        // alert(ltxt);
        var arr = inputText.toUpperCase().substr(8,ltxt-1).split(",");

        // alert(arr);
        coordinateX1 = float(arr[0]);
        coordinateY1 = float(arr[1]);
        Cd = float(arr[2]);
        stroke(Sc);
        strokeWeight(Ss);
        if (Fc != ''){
          fill(Fc);
        } else {
          noFill();
        }

        circle(coordinateX1, coordinateY1, Cd);

        Shp = 'circle'; 
        return;

      } else if (inputText.toUpperCase().substr(0,7) == "QCIRCLE") {
        Cd = float(inputText.toUpperCase().substr(8));
      
        Shp = 'circle';
        return;
      }
      if (inputText.toUpperCase().substr(0,8) == "QSQUARE(") {
        var ltxt = inputText.toUpperCase().length-7;
        //alert(ltxt);
        var arr = inputText.toUpperCase().substr(8,ltxt-1).split(",");
        coordinateX1 = float(arr[0]);
        coordinateY1 = float(arr[1]);
        Cd = float(arr[2]);
        stroke(Sc);
        strokeWeight(Ss);
        if (Fc != ''){
          fill(Fc);
        } else {
          noFill();
        }

        square(coordinateX1, coordinateY1, Cd);

        Shp = 'square';
        return;
      } else if (inputText.toUpperCase().substr(0,7) == "QSQUARE") {
        Cd = float(inputText.toUpperCase().substr(8));
        Shp = 'square';
        return;
      }
      if (inputText.toUpperCase() == "RECTANGLE") {
        Cd = 100;
        Shp = 'rectangle';
        return;

      }          
      if (inputText.toUpperCase() == "TRIANGLE") {
        
        //triangle(118,328, 292, 61, 446, 340);
        Cd = 100;
        Shp = 'triangle';
        return;
      }
      if (inputText.toUpperCase() == "SCRIBBLE") {
        
        //triangle(118,328, 292, 61, 446, 340);
        Cd = 100;
        mCX1 = 0;
        mCY1 = 0;
        mCX2 = 0;
        mCY2 = 0;
        // Fc = 'gold';
        // Sc = 'black';
        Shp = 'scribble';
        return;
      }
      if (inputText.toUpperCase() == "LINE") {
        
        //triangle(118,328, 292, 61, 446, 340);
        Cd = 100;
        mCX1 = 0;
        mCY1 = 0;
        mCX2 = 0;
        mCY2 = 0;
        //Fc = 'gold';
        //Sc = 'black';
        Shp = 'line';
        return;
      }
      if (inputText.toUpperCase() == "SAVE") {

        Shp = 'save'
        // var a = document.createElement("a");
        // document.body.appendChild(a);
        // a.style = "display: none";
        // a.href = "/ibm/bluemix/appid/logout";
        // a.click();
        return;
      }
      if (inputText.toUpperCase().substr(0,12) == "CANVAS COLOR") {
        Cc = inputText.toUpperCase().substr(13);
        background(Cc);
        return;
      }
      if (inputText.toUpperCase().substr(0,5) == "TEXT(") {

        // alert(inputText.toUpperCase().substr(0,8));
        var ltxt = inputText.toUpperCase().length-5;
        // alert(ltxt);
        var arr = inputText.toUpperCase().substr(5,ltxt-1).split(",");

        alert(arr);
        coordinateX1 = float(arr[0]);
        coordinateY1 = float(arr[1]);
        Cd = arr[2];
        textSize(Ts);
        stroke(Sc);
        strokeWeight(Ss);
        if (Fc != ''){
          fill(Fc);
        } else {
          noFill();
        }

        text(Cd, coordinateX1, coordinateY1, windowWidth - 360, 400);
        // circle(coordinateX1, coordinateY1, Cd);

        Shp = 'text'; 
        return;

      } else if (inputText.toUpperCase() == "TEXT") {
        
        Cd = '';
        mCX1 = 0;
        mCY1 = 0;
        mCX2 = 0;
        mCY2 = 0;
        //Fc = 'green';
        //Sc = 'black';
        Shp = 'text';
        return;
      }

      if (inputText.toUpperCase() == "SHOW XY") {
        if (show_coordinates){
          show_coordinates = false;
        } else {
          show_coordinates = true;
        }

        return;
      }          

      if (Shp == 'text' ) {
        
        //triangle(118,328, 292, 61, 446, 340);
        iUrl = '/content/topic/Katha-girl3.png'
        nText += inputText + "\n";

        // if (nText.length > 83){
          
        // }

        fill(Fs);
        textSize(24);

        stroke('white');
        strokeWeight(2);
        //noFill();
        //fill(255);
        //rect(10, 15, windowWidth - 325, windowHeight - 120);
        //fill(255,0,55);
        text(nText, 1, 1, windowWidth - 60, windowHeight - 80);            
        //narrateText(nText, iUrl);
        return;
      }
      if (inputText.toUpperCase().substr(0,5) == "TEXT(") {

        // alert(inputText.toUpperCase().substr(0,8));
        var ltxt = inputText.toUpperCase().length-5;
        // alert(ltxt);
        var arr = inputText.toUpperCase().substr(5,ltxt-1).split(",");

        // alert(arr);
        coordinateX1 = float(arr[0]);
        coordinateY1 = float(arr[1]);
        Cd = arr[2];
        textSize(Ts);
        stroke(Sc);
        strokeWeight(Ss);
        if (Fc != ''){
          fill(Fc);
        } else {
          noFill();
        }

        text(Cd, coordinateX1, coordinateY1, windowWidth - 360, 400);
        // circle(coordinateX1, coordinateY1, Cd);

        Shp = 'text'; 
        return;

      } else if (inputText.toUpperCase() == "TEXT") {

        Cd = '';
        mCX1 = 0;
        mCY1 = 0;
        mCX2 = 0;
        mCY2 = 0;
        //Fc = 'green';
        //Sc = 'black';
        Shp = 'text';
        return;
      }

      if (inputText.toUpperCase() == "SHOW XY") {
        if (show_coordinates){
          show_coordinates = false;
        } else {
          show_coordinates = true;
        }

        return;
      }          

      if (Shp == 'text' ) {

        //triangle(118,328, 292, 61, 446, 340);
        iUrl = '/content/topic/Katha-girl3.png'
        nText += inputText + "\n";

        // if (nText.length > 83){
          
        // }

        fill('teal');
        textSize(24);

        stroke('white');
        strokeWeight(2);
        //noFill();
        //fill(255);
        //rect(10, 15, windowWidth - 325, windowHeight - 120);
        //fill(255,0,55);
        text(nText, 1, 1, windowWidth - 60, windowHeight - 80);            
        //narrateText(nText, iUrl);
        return;
    }



      var url = baseUrl+ "/process-message"; //"converse";
      userMessage = inputText;
      // uvid.src="./public/alice.mp4";
      waitImg.src="https://responsivevoice.org/wp-content/uploads/2020/01/parrot-flight.png";
      
      
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ userMessage: userMessage, voice: "" }),
      })
        .then(response => response.json())
        .then(response => {


          const textContainer = document.getElementById("historyArea");
          const text = response.openaiResponseText;
          textContainer.style.whiteSpace = "pre-line";
          textContainer.innerText = text;

          historyArea.value += text + '\n';
          historyArea.scrollTop = historyArea.scrollHeight;
          // uvid.src="./public/alice.mp4";

          // responsiveVoice.speak(inputText,"UK English Female");  

          
          waitImg.src="";
          let array = response.openaiResponseText.split("\n");

            ctr = ctr+1;
            let bid = 'btn'+ctr.toString();
            // alert(ctr);
            var btn = document.createElement("button");
            btn.setAttribute("class", "accordion");
            btn.setAttribute("id", bid);
            btn.setAttribute("onclick","myFunction()");

            var t = document.createTextNode(inputText);
            btn.appendChild(t);
            //para.appendChild(btn);
            document.getElementById("tcon").appendChild(btn);
            
            var dv = document.createElement("DIV");
            dv.setAttribute("class", "panel");
            dv.setAttribute("style", "display: block;");
            
            var tt = document.createTextNode("cGPT Response");
            dv.appendChild(tt);
            document.getElementById("tcon").appendChild(dv);
            if (array.length > 1) {
              for (j in array) {
                let charlen = array[j].length;

                let tid = 'txt-'+j.toString()+bid;

                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");

                inf.setAttribute("id", tid);
                // if (charlen > 121 ) {
                //   inf.setAttribute("rows", "4");
                //   document.getElementById(tid).style.height = "200px";
                // }
                inf.setAttribute("value", array[j]);
                inf.setAttribute("onclick","myFunction()");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);

                responsiveVoice.speak(array[j], "UK English Male"); 
                uvid.src="./public/spn.mp4";
                               
              }
            } else {
              let sid = 'tae-'+ctr.toString()+bid;
              // alert(sid);
              var inf = document.createElement("TEXTAREA");
              inf.setAttribute("type", "text");
              inf.setAttribute("style", "color:#777;background-color:transparent;border:1px solid #ddd;font-size:14px;width:100%;height:115px;resize:none;overflow-y:scroll;");
              inf.setAttribute("id", sid);
              inf.setAttribute("onclick","myFunction()");
              inf.setAttribute("class", "form-control");
              dv.appendChild(inf);
              document.getElementById("tcon").appendChild(dv);

              let cid = document.getElementsByTagName("textarea")[sid].id;
              // alert(cid);
              document.getElementById(cid).value = array[0];

              const textContainer = document.getElementById(cid);
              const text = array[0];
              textContainer.style.whiteSpace = "pre-line";
              textContainer.innerText = text;
              
              responsiveVoice.speak(array[0], "UK English Male");
              uvid.src="./public/spn.mp4";
            }
          
            const myList = document.querySelector('#tcon')
            const lastListItem = myList.lastElementChild;
            myList.insertBefore(lastListItem, myList.firstElementChild)
            const lastListItem2 = myList.lastElementChild;
            myList.insertBefore(lastListItem2, myList.firstElementChild)

            // alert(myList.innerHTML);

          var acc = document.getElementsByClassName("accordion");
          var i;

        })
        .catch(error => {
          // Handle any errors
      });
      
    }
    function startSecondSpeech() {
      // uvid.src="./public/spn.mp4";
      // return;
        responsiveVoice.speak("Hmm", "UK English Male");
        // Add any other speech commands or actions you need to perform here
    }

    function myFunction() {
      var clickedElement = event.target;
      var clickedElementID = clickedElement.id;
      var sbsclickedElementID = clickedElementID.substring(0,3);
      var divValue;
      if (sbsclickedElementID == "txt") {
        divValue = document.getElementById(clickedElementID).value;
        responsiveVoice.speak(divValue, "UK English Male");
      chatInput.value = divValue;
      } else {
        divValue = document.getElementById(clickedElementID).innerHTML;
      }
      // alert(clickedElementID);


      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    }

    function countCharacters() {
      var textbox = document.getElementById("chatInput");
      var charCount = document.getElementById("charCount");
      charCount.innerText = textbox.value.length + " characters";
    }


    function send_txt(ar01) {

      show_send_btn();
      if (ar01=="chatInput"){ 
        if(ncnt > 0 ) {
          //var cfid = 'fi0'+ncnt.toString();
          
          var fid = document.getElementById('fi0'+ncnt.toString());
          fid.value = chatInput.value;
        }

      } else {
      
        var x = document.getElementById(ar01);
        //x.value = x.value.toUpperCase();
        chatInput.value = x.value;
        
      }
    }
  

    function chartFunc(xValuesRT, yValuesRT, barColors){

      // document.getElementById("spnChart").style.display = "block";

      // var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
      // var yValues = [55, 49, 44, 24, 15];
      // var barColors = ["red", "green","blue","orange","brown"];

      new Chart("spnChart", {
        type: "horizontalBar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "World Wine Production 2018"
          }
        }
      });
    }


    function siteControls(inputText) {
        if (inputText == 'pause video' || inputText == 'pause' || inputText == 'stop video' || inputText == 'stop')  {
          vid.pause();
          return;
        } 
        if (inputText == 'play video'|| inputText == 'play')  {
          vid.play();
          return;
        } 
        if (inputText == 'show mic'|| inputText == 'use speech' || inputText == 'use mic' || inputText == 'use microphone')  {
          document.getElementById("panel").style.display = "block";
          return;
        } 
        if (inputText == 'hide mic'|| inputText == 'no speech' || inputText == 'no mic' || inputText == 'hide microphone')  {
          document.getElementById("panel").style.display = "none";
          return;
        }    
        if (inputText == 'mute'|| inputText == 'mute sound' || inputText == 'sound off' || inputText == 'no sound')  {
          vid.muted = true;
          return;
        }
        if (inputText == 'enable sound' || inputText == 'keep sound' || inputText == 'set volume on' || inputText == 'unmute')  {
          vid.muted = false;
          return;
        }  
        if (inputText == 'show video controls' || inputText == 'show controls' || inputText == 'toggle video controls') {
          showAVControl();
          return;
        }  
        if (inputText == 'hide video controls' || inputText == 'hide controls' || inputText == 'toggle video controls') {
          showAVControl();
          return;
        } 
        if (inputText == 'show camera' || inputText == 'on camera' || inputText == 'on video' || inputText == 'enable camera')  {
          toggleAppInfo();
          return;
        } 
        if (inputText == 'hide camera' || inputText == 'off camera' || inputText == 'off video' || inputText == 'disable camera')  {
          toggleAppInfo();
          return;
        }   
        if (inputText == 'click' || inputText == 'capture' || inputText == 'start video')  {
          snapClick();
          return;
        } 

        if (inputText == 'save' || inputText == 'save' )  {
          saveFunc();
          return;
        } 

        if (inputText.toUpperCase().trim() == "QRCODE") {
            ctr = ctr+1;

            let bid = 'btn'+ctr.toString();

            var btn = document.createElement("button");
            btn.setAttribute("class", "accordion");
            btn.setAttribute("id", bid);
            btn.setAttribute("onclick","myFunction()");

            var t = document.createTextNode(inputText);
            inputText = "";
            btn.appendChild(t);
            //para.appendChild(btn);
            document.getElementById("tcon").appendChild(btn);
            var dv = document.createElement("DIV");
            dv.setAttribute("class", "panel");
            dv.setAttribute("style", "display: block;");
            dv.setAttribute("ID", "qrcode");

            var tt = document.createTextNode("QR Code Response");
            dv.appendChild(tt);
            document.getElementById("tcon").appendChild(dv);


            let cvsid = 'can-'+ctr.toString();  
            
            var can = document.createElement("DIV");
            // can.setAttribute("style", "width:100%;")
          
            can.setAttribute("ID", cvsid);

            dv.appendChild(can);
            document.getElementById("tcon").appendChild(dv);


            const myList = document.querySelector('#tcon')
            const lastListItem = myList.lastElementChild;
            myList.insertBefore(lastListItem, myList.firstElementChild)
            const lastListItem2 = myList.lastElementChild;
            myList.insertBefore(lastListItem2, myList.firstElementChild)

            // Get the URL of the current page
            var currentURL = window.location.href;

            // Generate QR code using the URL
            var qrcode = new QRCode(document.getElementById(cvsid), {
              text: currentURL,
              width: 128,
              height: 128
            });

            return;
        }
        if (inputText == 'chart' || inputText == 'bar chart' || inputText == 'line chart' || inputText == 'vertical bar chart')  {
          // var c = document.querySelector('canvas');
              
          
          // ctr = ctr+1;

          // let bid = 'btn'+ctr.toString();



          //   var btn = document.createElement("button");
          //   btn.setAttribute("class", "accordion");
          //   btn.setAttribute("id", bid);
          //   btn.setAttribute("onclick","myFunction()");

          //   var t = document.createTextNode(inputText);
          //   btn.appendChild(t);
          //   //para.appendChild(btn);
          //   document.getElementById("tcon").appendChild(btn);


          // let cvsid = 'can-'+ctr.toString();
          
          
          // var can = document.createElement("canvas");
          // can.setAttribute("style", "width:100%;");
        
        
          // can.setAttribute("ID", cvsid);

          // document.getElementById("tcon").appendChild(can);


          // const myList = document.querySelector('#tcon')
          // const lastListItem = myList.lastElementChild;
          // myList.insertBefore(lastListItem, myList.firstElementChild)
          // const lastListItem2 = myList.lastElementChild;
          // myList.insertBefore(lastListItem2, myList.firstElementChild)

          const synth = window.speechSynthesis; // Initialize the synth object
          const canvas = document.getElementById("stackedChart");
          var vmData = [ 
              {
                  squad_name: "APPS",
                  incidents: {
                      New: { P1: 2, P2: 3, P3: 6, P4: 50, P5: 60  },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              },
              {
                  squad_name: "BACKUP",
                  incidents: {
                      New: { P1: 5, P2: 10, P3: 15, P4: 8, P5: 3 },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              },
              {
                  squad_name: "LINUX",
                  incidents: {
                      New: { P1: 5, P2: 10, P3: 15, P4: 8, P5: 3 },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              },
              {
                  squad_name: "NETWORK",
                  incidents: {
                      New: { P1: 5, P2: 10, P3: 15, P4: 8, P5: 3 },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              },
              {
                  squad_name: "SECURITY",
                  incidents: {
                      New: { P1: 2, P2: 3, P3: 6, P4: 50, P5: 60  },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              },
              {
                  squad_name: "STORAGE",
                  incidents: {
                      New: { P1: 5, P2: 10, P3: 15, P4: 8, P5: 3 },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              },
              {
                  squad_name: "WINDOWS",
                  incidents: {
                      New: { P1: 5, P2: 10, P3: 15, P4: 8, P5: 3 },
                      "In Progress": { P1: 2, P2: 5, P3: 7, P4: 3, P5: 1 },
                      Resolved: { P1: 8, P2: 12, P3: 18, P4: 10, P5: 5 },
                      Closed: { P1: 3, P2: 6, P3: 8, P4: 4, P5: 2 }
                  }
              }
          ];
  
          // Extract unique categories and severities
          var categories = Object.keys(vmData[0].incidents);
          var severities = Object.keys(vmData[0].incidents[categories[0]]);
  
          // alert(severities)
  
          var storedValues = [];
          var storedValues2 = [];
          // Create labels for the chart (squad names)
          // var squadNames = vmData.map(squad => squad.squad_name);
          // Extract unique squad names
          var squadNames = vmData.map(item => item.squad_name);
  
          // Create data for the chart
          var datasets = [];
          var categoryColors = {
              New: 'red',
              "In Progress": 'yellow',
              Resolved: 'green',
              Closed: 'blue',
              Predicted: 'cyan' // New color for predicted incidents
          };
          // Function to get color based on category
          function getColor(category, severity) {
              // getColor2(severity);
              // Return colors based on category
              // You can customize the colors here
              // alert(category +" "+severity);
              if (category === "New") return "rgba(255, 0, 0, 0.8)";
              if (category === "In Progress") return "rgba(255, 165, 0, 0.8)";
              if (category === "Resolved") return "rgba(255, 255, 0, 0.8)";
              if (category === "Closed") return "rgba(0, 128, 0, 0.8)";
              // if (category === "Re_Opened") return "rgba(0, 0, 255, 0.8)";
              if (severity === "P1") return "rgba(55, 0, 0, 0.8)";
              if (severity === "P2") return "rgba(255, 165, 0, 0.8)";
              if (severity === "P3") return "rgba(255, 155, 0, 0.8)";
              if (severity === "P4") return "rgba(10, 128, 0, 0.8)";
              if (severity === "P5") return "rgba(0, 0, 25, 0.8)";
          }
  
          var labels = vmData.map(vm => vm.vm);
          var datasets = categories.map(category => {
              return {
                  // label: [category, severities],
                  label: [category],
                  data: vmData.map(vm => calculateCategoryTotal(vm.incidents, category)),
                  backgroundColor: severities.map(severity => getColor(category)),
                  borderWidth: 1
              };
          });        
          var pi = [];
          // Function to calculate total incidents for a category across all severities
          function calculateCategoryTotal(incidents, category) {
              totalSum = Object.values(incidents[category]).reduce((total, severity) => total + severity, 0);
              // alert(totalSum)
              return totalSum;
          }
   
          // Create a bar chart using Chart.js
          var ctx = canvas.getContext('2d');
  
          const config = {
              type: 'bar',
              data: {
                  labels: squadNames,
                  datasets: datasets
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  },
              animation: {
                  duration: 0.1,
                  onComplete: function (chart) {
                      
                      const datasets = stackedChart.data.datasets;
                      ctx.font = "12px sans-serif";
                      ctx.fillStyle = "black";
                      ctx.textAlign = "center";
                      // var squadsTeams = squadNames;
                      // Extract unique squad names
                      var squadsTeams = vmData.map(item => item.squad_name);
  
                      for (let i = 0; i < datasets.length; i++) {
                          console.log(datasets.length);
  
                          const meta = stackedChart.getDatasetMeta(i);
                          meta.data.forEach((bar, index) => {
                              var squad = squadsTeams[index];
                              // alert(squad)
                              
                              var data = datasets[i].data[index];;
                              var lbl = datasets[i].label;
                              
                              const value = datasets[i].data[index];
                              const x = bar.x;
                              const y = bar.y +7 ; // Adjust the vertical position
                              // console.log(squad, lbl, value);
                              ctx.fillText(value, x, y);
                              if (storedValues.length < 35) {
                              storedValues.push({ squad: squad, label: lbl, data: data, x: x, y: y });
                              console.log('SPNIZE - >> ',storedValues.length);
                              
                              }
                          });
                      }
                  }
              },
              plugins: {
                  title: {
                      display: true,
                      color: "green",
                      font: {size: 14},
                      text: 'Daily Incident Status',
                      padding: {
                          top: 10,
                          bottom: 10
                      },
  
                  }
              }
          }
      };
  
      const stackedChart = new Chart(canvas, config);
  
      // Sample past data for prediction
      const pastData = [100, 150, 200, 250, 300, 350, 400];
  
      // Function to predict severity based on past performance
      function predictSeverity(pastData) {
          // Add your prediction logic here (e.g., using machine learning models)
  
          // For simplicity, let's assume we add 10% to the past data for prediction
          return pastData.map(value => Math.round(value * 1.1));
      }
      
      // Calculate predicted incidents
      var predictedData = vmData.map(vm => Math.round(calculateCategoryTotal(vm.incidents, 'New') * 1.1));
      // var predictedData = vmData.map(squad => severities.map(severity => Math.round(squad.incidents.New[severity] * 1.1)));
      // alert(predictedData)
      
      datasets.push({
          label: 'Predicted',
          data: [].concat.apply([], predictedData), // Flatten the nested array
          backgroundColor: categoryColors.Predicted,
          // borderColor: categoryColors.Predicted,
          borderWidth: 1
      });
  
      stackedChart.update();
  
      // Function to retrieve values with a delay
      function retrieveValuesWithDelay(delay) {
          // Sort the storedValues array based on the "squad" property
          storedValues.sort((a, b) => a.squad.localeCompare(b.squad));
  
          // Now you can retrieve the sorted values with a delay
          storedValues.forEach((item, index) => {
              const squad = item.squad;
              const label = item.label;
              const data = item.data;
              const x = item.x;
              const y = item.y;
              
              // Retrieve the values after a delay of 7 seconds for each iteration
              setTimeout(() => {
                  // console.log(`Squad: ${squad}, Label: ${label}, Data: ${data}, X: ${x}, Y: ${y}`);
                  var mouseMoveEvent = new MouseEvent("mousemove", {
                              bubbles: true,
                              cancelable: true,
                              clientX: x,
                              clientY: y + 3,
                          });
  
                          canvas.dispatchEvent(mouseMoveEvent);
                          
  
                          // Use text-to-speech to announce the status and severity for each squad
                          if (label == "New") {
                              announcementText = `For ${squad}: we have ${data}: ${label} incidents.`;
                              // canvas.click();
                          } else if (label == "Resolved") {
                              announcementText = `We have ${data} incidents ${label} for ${squad}.`;
                          } else if (label == "In Progress") {
                              announcementText = `The ${squad} Squad has ${data} incidents which are ${label}`;
                          } else if (label == "Closed") {
                              announcementText = `Total incidents ${label} by ${squad} Squad are around ${data}.`;
                          } else if (label == "Re-opened") {
                              announcementText = `${squad}: ${label}: ${data} incidents re-opened.`;
                          } else if (label == "Predicted") {
                              announcementText = `The Overall ${label}: number of incidents for ${squad} Squad is around ${data}.`;
                          } else {
                              announcementText = `${squad}: ${label}: ${data} incidents.`;
                          }
  
                          speakWithBuffer(announcementText);
                          if (index == 34){
                              recordBtn.click();
                          }
     
              }, index * 7000); // Delay of 7 seconds (7000 milliseconds)
          });
          
      }
  
          // Announce the predicted severity after 3 seconds
          // setTimeout(retrieveValuesWithDelay, 7000);
  
          // const canvas = document.getElementById('canvas');
          const context = canvas.getContext("2d");
          // const recordBtn = document.querySelector("button");
          
          const recordBtn = document.getElementById("recordBtn");

          // alert(recordBtn.id)
  
          let recording = false;
          let mediaRecorder;
          let recordedChunks = [];
          let audioBuffers = [];
  
          recordBtn.addEventListener("click", async () => {
              recording = !recording;
              if (recording) {
                  recordBtn.textContent = "Stop Meeting";
                  const stream = canvas.captureStream(25);
                  mediaRecorder = new MediaRecorder(stream, {
                      mimeType: 'video/webm;codecs=vp8',
                      ignoreMutedMedia: true
                  });
                  recordedChunks = [];
                  audioBuffers = [];
  
                  mediaRecorder.ondataavailable = (e) => {
                      if (e.data.size > 0) {
                          recordedChunks.push(e.data);
                      }
                  };
  
                  mediaRecorder.start();
                  
                  // Start recording canvas events and text-to-speech audio
                  startCanvasEventRecording();
                  
              } else {
                  recordBtn.textContent = "Start Meeting";
                  mediaRecorder.stop();
  
                  // Stop recording canvas events and text-to-speech audio
                  stopCanvasEventRecording();
  
              }
          });
  
  // Function to start recording canvas events and text-to-speech audio
  function startCanvasEventRecording() {
      // var delay = 3000;
      speakWithBuffer("Hi Squad Leaders and others, Thanks for joining the Daily Incident Status Meeting.");
      setTimeout(retrieveValuesWithDelay, 5000);
      // canvas.addEventListener("mousemove", handleMouseMove);
  }
  
  // Function to stop recording canvas events and text-to-speech audio
  async function stopCanvasEventRecording() {
      
      storedValues.splice(0) = [];
      const announcementText = "Thanks for attending the meeting, the session is now open for questions and clarification.";
      const bufferArray = await speakWithBuffer(announcementText);
      console.log("Received bufferArray:", bufferArray);
      audioBuffers.push(...(Array.isArray(bufferArray) ? bufferArray : [bufferArray]));
  
      // Ensure that audioBuffers are populated before proceeding
      if (recordedChunks.length > 0 && audioBuffers.length > 0) {
          // const combinedBlob = await mergeAudioBuffers(audioBuffers) //mergeVideoAndAudio(recordedChunks, audioBuffers);
          const combinedBlob = await mergeVideoAndAudio(recordedChunks, audioBuffers);
          const url = URL.createObjectURL(combinedBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "canvas_recording_with_audio.webm";
          a.click();
          URL.revokeObjectURL(url);
          
      } else {
          console.log("audioBuffers array is empty.");
      }
  }
  
  // Function to merge video and audio
  async function mergeVideoAndAudio(videoChunks, audioBuffers) {
      const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
  
      const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Create an AudioContext
  
      // Check if audioBuffers is an array and not empty
      if (!Array.isArray(audioBuffers) || audioBuffers.length === 0) {
          throw new Error('Invalid or empty audioBuffers array.');
      }
  
      // Create an OfflineAudioContext for rendering the combined audio
      const offlineAudioContext = new OfflineAudioContext({
          numberOfChannels: audioBuffers[0].numberOfChannels,
          length: audioBuffers[0].length * audioBuffers.length,
          sampleRate: audioBuffers[0].sampleRate,
      });
  
      audioBuffers.forEach((audioBuffer, index) => {
          const source = offlineAudioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(offlineAudioContext.destination);
          source.start(index * audioBuffer.length);
      });
  
      // Start the rendering process
      const renderedAudioBuffer = await offlineAudioContext.startRendering();
  
      const audioBufferArrayBuffer = audioBufferToWavArrayBuffer(renderedAudioBuffer);
      const audioUint8Array = new Uint8Array(audioBufferArrayBuffer);
  
      const audioBlob = new Blob([audioUint8Array], { type: 'audio/wav' });
  
      return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = async () => {
              const audioArrayBuffer = reader.result;
              const videoArrayBuffer = await videoBlob.arrayBuffer();
              const videoUint8Array = new Uint8Array(videoArrayBuffer);
  
              const combinedUint8Array = new Uint8Array(videoUint8Array.length + audioArrayBuffer.byteLength);
              combinedUint8Array.set(videoUint8Array, 0);
              combinedUint8Array.set(new Uint8Array(audioArrayBuffer), videoUint8Array.length);
  
              resolve(new Blob([combinedUint8Array], { type: 'video/webm' }));
          };
          reader.readAsArrayBuffer(audioBlob);
      });
  }
  
  
  // Handle mouse move event
  function handleMouseMove(event) {
      // ... (your canvas event handling logic)
  
      const announcementText = "Your announcement text here";
      speakWithBuffer(announcementText).then(bufferArray => {
          audioBuffers.push(...bufferArray);
      });
  }
  
  // Function to speak and return an audio buffer
  async function speakWithBuffer(text) {
      return new Promise(async (resolve, reject) => {
          try {
                  const utterance = new SpeechSynthesisUtterance(text);
                  utterance.lang = 'en-US';
  
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
              const analyserNode = audioContext.createAnalyser();
              analyserNode.fftSize = 2048;
              const bufferLength = analyserNode.frequencyBinCount;
              const dataArray = new Float32Array(bufferLength);
  
              const source = audioContext.createBufferSource();
              source.connect(analyserNode);
              analyserNode.connect(audioContext.destination);
  
              const chunks = [];
  
              utterance.onend = async () => {
                  source.stop();
                  analyserNode.disconnect();
                  const audioBuffer = audioContext.createBuffer(1, chunks.length * bufferLength, audioContext.sampleRate);
                  const audioBufferChannelData = audioBuffer.getChannelData(0);
  
                  for (let i = 0; i < chunks.length; i++) {
                      audioBufferChannelData.set(chunks[i], i * bufferLength);
                  }
  
                  resolve(audioBuffer);
              };
  
              source.onended = () => {
                  resolve(null); // Resolve with null if playback ends unexpectedly
              };
  
              source.start();
  
              // Capture audio data using analyserNode
              function captureAudioData() {
                  analyserNode.getFloatTimeDomainData(dataArray);
                  chunks.push(new Float32Array(dataArray));
                  requestAnimationFrame(captureAudioData);
              }
  
              captureAudioData();
  
              synth.speak(utterance);
          } catch (error) {
              console.error("Error in speakWithBuffer:", error);
              reject(error);
          }
      });
  }
  function audioBufferToWavArrayBuffer(audioBuffer) {
      const numChannels = audioBuffer.numberOfChannels;
      const sampleRate = audioBuffer.sampleRate;
      const numFrames = audioBuffer.length;
      const samples = new Float32Array(numFrames * numChannels);
  
      for (let channel = 0; channel < numChannels; channel++) {
          const channelData = audioBuffer.getChannelData(channel);
          samples.set(channelData, channel * numFrames);
      }
  
      const buffer = new ArrayBuffer(44 + samples.length * 2);
      const view = new DataView(buffer);
  
      // RIFF chunk descriptor
      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + samples.length * 2, true);
      writeString(view, 8, 'WAVE');
  
      // Format chunk
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, 16, true);
  
      // Data chunk
      writeString(view, 36, 'data');
      view.setUint32(40, samples.length * 2, true);
  
      // Write the PCM samples
      floatTo16BitPCM(view, 44, samples);
  
      return buffer;
  }
  
  function writeString(view, offset, string) {
      for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
      }
  }
  
  function floatTo16BitPCM(output, offset, input) {
      for (let i = 0; i < input.length; i++, offset += 2) {
          const s = Math.max(-1, Math.min(1, input[i]));
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
  }
  
      canvas.addEventListener("click", function(evt) {
          var activePoint = stackedChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
  
          if (activePoint.length > 0) {
              var datasetIndex = activePoint[0].datasetIndex;
              var selectedIndex = activePoint[0].index;
              var squad = stackedChart.data.labels[selectedIndex];
              var label = stackedChart.data.datasets[datasetIndex].label;
              var value = stackedChart.data.datasets[datasetIndex].data[selectedIndex];
              // alert(`Squad: ${squad}\nSeverity: ${label}\nCount: ${value}`);
              console.log('>>>>>>>>>>>>>>>>>>>>>>', squad);
              var modal = document.getElementById("myModal");
              var span = document.getElementsByClassName("close")[0];
              modal.style.display = "block";
  
              // For Slide-in Pane
              // var slidePane = document.getElementById("slidePane");
              // slidePane.style.right = "0";
              var sn = vmData.map(vm => vm.squad_name);
  
              function calculateSeverityTotal(vmData, squad, category, severity) {
                  const squadData = vmData.find(vm => vm.squad_name === squad);
                  if (squadData) {
                      return squadData.incidents[category][severity];
                  }
                  return 0;
              }
  
              var datasets = severities.map(severity => {
                  return {
                      label: severity,
                      data: categories.map(category => calculateSeverityTotal(vmData, squad, category, severity)),
                      backgroundColor: getColor(severity),
                      borderWidth: 1
                  };
              });
  
  
  
              var chartData2 = {
                  type: 'bar',
                  scales: {
                      x: {
                          stacked: false
                      },
                      y: {
                          stacked: false
                      }
                  },
                  data: {
                      labels: categories,
                      datasets: datasets
                  },
                  options: {
                      "animation": {
                      "duration": 0.1,
                      onComplete: function (chart) {
                          const datasets = myChart.data.datasets;
                          
                          ctx2.font = "12px sans-serif";
                          ctx2.fillStyle = "black";
                          ctx2.textAlign = "center";
                          // var squadsTeams = stackedChart.data.labels;
  
                          for (let i = 0; i < datasets.length; i++) {
                              const meta = myChart.getDatasetMeta(i);
                              meta.data.forEach((bar, index) => {
                                  // var squad = squadsTeams[index];
                                  // var data = datasets[i].data[index];;
                                  // var lbl = datasets[i].label;
  
                                  const value = datasets[i].data[index];
                                  const x = bar.x;
                                  const y = bar.y +7 ; // Adjust the vertical position
  
                                  ctx2.fillText(value, x, y);
                                  // storedValues.push({ squad: squad, label: lbl, data: data, x: x, y: y });
                              });
                          }
                      }
                      },
                      plugins: {
                          title: {
                              display: true,
                              color: "blue",
                              font: {size: 14},
                              text: 'Incident Severity Break-up Report for: '+squad+ ' Squad',
                              padding: {
                                  top: 10,
                                  bottom: 10
                              },
  
                          }
                      }
                  }
              };
  
              var canvas2 = document.getElementById('myChart');
              var ctx2 = canvas2.getContext('2d');
              var myChart = new Chart(ctx2, chartData2);
  
              // Close modal or slide-in pane when the close button is clicked
              span.onclick = function() {
                  modal.style.display = "none";
                  if (typeof myChart !== 'undefined' && myChart !== null) {
                      myChart.destroy(); // Destroy the existing chart instance
                          // Restore canvas dimensions to initial values
                      // myChartCanvas.width = "90%"; //initialMyChartWidth;
                      // myChartCanvas.height = "490px" //initialMyChartHeight;
                      // style="height: 490px; width: 90%;"
                  }
                  // slidePane.style.right = "-400px";
              };
          }
      });          
          
          // // document.getElementById(cvsid).style.display = "block";
          // var xValues = ["Italy", "France", "Spain", "USA", "Argentina", "Italy", "France", "Spain", "USA", "Argentina", "Italy", "France", "Spain", "USA", "Argentina"];
          // var yValues = [55, 49, 44, 24, 15, 55, 49, 44, 24, 15, 55, 49, 44, 24, 15];
          // var barColors = ["red", "green","blue","orange","brown"];
          // var btype = "bar" //nputText.substring(0,1);

          // // alert(btype);

          //   new Chart(cvsid, {
          //     type: btype,
          //     data: {
          //       labels: xValues,
          //       datasets: [{
          //         backgroundColor: barColors,
          //         data: yValues
          //       }]
          //     },
          //     options: {
          //       legend: {display: false},
          //       title: {
          //         display: true,
          //         text: "World Wine Production 2018"
          //       },
          //       scales: {
          //         xAxes: [{ticks: {min: 10, max:60}}]
          //       }
          //     }
          //   });
            //chartFunc(xValues,yValues,barColors);
            //inputText = text +' countries '+ xValues + ' versus in percent' + yValues

            return;
        } 


        
        if (inputText == 'clear' || inputText == 'restart' )  {
          
          var list = document.getElementById("tcon");
          while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
          }
        } 

        if (inputText == 'snapClick')  {
          
          ctr = ctr+1;

          let bid = 'btn'+ctr.toString();
          var context = snapshot.getContext('2d');
          context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
          //ImgData = context.getImageData(0, 0, snapshotCanvas.width, snapshotCanvas.height);
          // var fullQuality = snapshotCanvas.toDataURL("image/jpeg", 1.0);
          // var image = new Image();
          // image.src = snapshotCanvas.toDataURL("image/jpeg", 1.0);
      
          var btn = document.createElement("button");
          btn.setAttribute("class", "accordion");
          btn.setAttribute("id", bid);
          btn.setAttribute("onclick","myFunction()");

          var t = document.createTextNode(inputText);
          btn.appendChild(t);
          //para.appendChild(btn);
          document.getElementById("tcon").appendChild(btn);

          let cvsid = 'can-'+ctr.toString();
          
          var can = document.createElement("img");
          can.setAttribute("width", "100%");
                    
          can.setAttribute("ID", cvsid);
          
          can.src = snapshotCanvas.toDataURL("image/jpeg", 1.0);
          usrImg.src = snapshotCanvas.toDataURL("image/jpeg", 1.0);

          document.getElementById("tcon").appendChild(can);


          const myList = document.querySelector('#tcon')
          const lastListItem = myList.lastElementChild;
          myList.insertBefore(lastListItem, myList.firstElementChild)
          const lastListItem2 = myList.lastElementChild;
          myList.insertBefore(lastListItem2, myList.firstElementChild)

          // return;
        } 

}   

    function viewAssets() {

      var url = "viewAssets";

      var jsondata = { requestId: "sridhar", assistant_id: assistantid, session_id: sessionid };

      ajaxJSONPost(url, jsondata, function(aresult) {
          
        jsondata = JSON.stringify(aresult);
        //alert(jsondata);
                var list = document.getElementById("tcon");
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
        var i, x = "";

        for (i in aresult) {

          x = i +' '+aresult[i]._id;
          an = aresult[i].assetName;
          bn = aresult[i].buildingName;
          sn = aresult[i].spaceId;
          pn = aresult[i].phone;

                var para = document.createElement("P");
                var btn = document.createElement("Button");
                btn.setAttribute("class", "accordion");
                var t = document.createTextNode(x);
                btn.appendChild(t);
                //para.appendChild(btn);
                document.getElementById("tcon").appendChild(btn);
                var dv = document.createElement("DIV");
                dv.setAttribute("class", "panel");


                var tt = document.createTextNode("Asset Name");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", an);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);


                var tt = document.createTextNode("Building Name");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", bn);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);


                var tt = document.createTextNode("Space Id");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", sn);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);


                var tt = document.createTextNode("Phone");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);

                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", pn);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);

                    
        }

        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }

      });
      
    }


    function viewTickets() {

      var url = "viewTickets";

      var jsondata = { requestId: "sridhar", assistant_id: assistantid, session_id: sessionid };

      ajaxJSONPost(url, jsondata, function(aresult) {
          
        jsondata = JSON.stringify(aresult);
        //alert(jsondata);
                var list = document.getElementById("tcon");
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
        var i, x = "";

        for (i in aresult) {

          x = i +' '+aresult[i]._id;
          ip = aresult[i].issue;
          bn = aresult[i].buildingName;
          wd = aresult[i].weekDay;
          dt = aresult[i].dayTime;
          pn = aresult[i].phone;

                var para = document.createElement("P");
                var btn = document.createElement("Button");
                btn.setAttribute("class", "accordion");
                var t = document.createTextNode(x);
                btn.appendChild(t);
                //para.appendChild(btn);
                document.getElementById("tcon").appendChild(btn);
                var dv = document.createElement("DIV");
                dv.setAttribute("class", "panel");


                var tt = document.createTextNode("Issue");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", ip);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);


                var tt = document.createTextNode("Building Name");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", bn);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);


                var tt = document.createTextNode("Week Day");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", wd);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);


                var tt = document.createTextNode("Time");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);
               
                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", dt);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);

                var tt = document.createTextNode("Phone");
                dv.appendChild(tt);
                document.getElementById("tcon").appendChild(dv);

                var inf = document.createElement("INPUT");
                inf.setAttribute("type", "text");
                inf.setAttribute("value", pn);
                //inf.setAttribute("id", ar0);
                //inf.setAttribute("onkeyup", "send_txt(id)");
                inf.setAttribute("class", "form-control");
                dv.appendChild(inf);
                document.getElementById("tcon").appendChild(dv);

                    
        }

        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }

      }); 
      

    }


    function delsession() {

      var url = "delsession";

      var jsondata = { requestId: "sridhar", assistant_id: assistantid, session_id: sessionid };
    
      ajaxJSONPosta(url, jsondata, function(response) {
          
        alert(JSON.stringify(response))

      });
    }
    
    window
        .addEventListener(
            'load',
            function() {
              // showVButtons('none');
              // updateImage('');
              // var c = document.querySelector('canvas');
              
              // alert(c.id);
              // Get the canvas element
              const canvas = document.getElementById("defaultCanvas0");

              // Get the label element
              const aside = document.getElementById("asideLabel");
              
              // Move the canvas inside the label
              aside.appendChild(canvas);

              // Shp = "onload"
              // document.getElementById("toggle").click();
              // document.getElementById("panel").style.display = "none";
                 
              // siteControls(inputText);  




              initiate(assistantid);

              historyArea.value += 
                      "me>> "+ "You're not authenticated :(" + "\n";
                  historyArea.scrollTop = historyArea.scrollHeight; 

              // document.getElementById("spnChart").style.display = "none";
              // const canvas = document.getElementById("defaultCanvas0");
              // const canvasContainer = document.getElementById("canvasContainer");
              // if (canvas && canvasContainer) {
              //     canvasContainer.appendChild(canvas);
              // }
              // uvid.src="https://cdn2.veltra.com/ptr/20180427105257_558150640_10498_0.jpg";
              waitImg.src="";
              uvid.style.display = "block"; 
              // usrImg.src="https://cdn2.veltra.com/ptr/20180427105257_558150640_10498_0.jpg";
              cmsImg.src="";  //"https://responsivevoice.org/wp-content/uploads/2020/01/parrot-flight.png"
              //startButton(event);
              // sendConverse("Jargon of the day");

              // setTimeout('loadJson("' + BASE_CMS_URL + '/content/json/escape101.json")', imagePlayInterval);

            });
    
    (function() {
      document
          .getElementById('chatInput')
          .addEventListener(
              'keydown',
              function(e) {
                if (e.keyCode === 13) {
                  //send_button.style.display = 'none';
                  var inputText = this.value;
                  if (inputText != ""){
                    historyArea.value += 
                      'me>> '+ inputText + '\n';
                    historyArea.scrollTop = historyArea.scrollHeight;                  
                  // siteControls(inputText);  
                    sendConverse(inputText);
                  }
                  this.value = ''; 
                }
                if (e.keyCode === 27) {
                  sendConverse("CLEAR");
                }  
                // if (e.keyCode === 37) {
                //   sendConverse("MOVE LEFT");
                // }   
                // if (e.keyCode === 38) { 
                //   sendConverse("MOVE TOP");
                // }
                // if (e.keyCode === 39) {
                //   sendConverse("MOVE RIGHT");
                // }   
                // if (e.keyCode === 40) {
                //   sendConverse("MOVE DOWN");
                // }  
              });
    })();

/*  
    $(window).on("beforeunload", function() { 
      var closeText = 'Okay, bye!';
      kathaClose(closeText);
      return closeText; 
    })
*/


function updateImage(srcUri) {
      //console.log('Locating image: ' + BASE_CMS_URL + '/' + srcUri);
      //$('cmsImage').attr('src', BASE_CMS_URL + '/' + srcUri);  
      //document.getElementById("usrImg").src = BASE_CMS_URL + '/' + srcUri;
      if (srcUri.substr(0,4) == 'http')
      {
		    document.getElementById("cmsImg").src = srcUri;
      } else {
      	document.getElementById("cmsImg").src = BASE_CMS_URL + '/' + srcUri;
      }

    }

    function playNextImage(count, bid) { 
      var nextImage = globalContentJsonObj.images[+count];
      var vdourl = "";
      //var vid = document.getElementById("myVideo");
      var jid = globalContentJsonObj.id;
      // ctr = ctr+1;
      // clear();
      fill('');
      textSize(30);

      stroke('black');
      strokeWeight(3);
      clear();
      if (jid == "video") {
          
          vdourl = BASE_CMS_URL +'/'+ nextImage.uri;
          document.getElementById("cmsImg").src = "";

         //document.getElementById("cmsImg").style.display = "none";
          //document.getElementById("vdo").style.display = "block";
          //showVButtons('inline-block');
          // uvid.style.display = "block";
          // uvid.src = vdourl;
          // uvid.load();

      } else {
      //   if (ctr == 1 ) {
      //       let bid = 'btn'+ctr.toString();
      //       // alert(ctr);
      //       var btn = document.createElement("button");
      //       btn.setAttribute("class", "accordion");
      //       btn.setAttribute("id", bid);
      //       btn.setAttribute("onclick","myFunction()");

      //       var t = document.createTextNode("Introduction to Escape!!");
      //       btn.appendChild(t);
      //       //para.appendChild(btn);
      //       document.getElementById("tcon").appendChild(btn);
            
      // }
      //       var dv = document.createElement("DIV");
      //       dv.setAttribute("class", "panel");
      //       // dv.setAttribute("style", "display: block;");
      //       dv.setAttribute("style", "display: block; font-size: 20px; font-family: Arial, sans-serif;");
            
      //       var tt = document.createTextNode(nextImage.description);
      //       dv.appendChild(tt);
      //       document.getElementById("tcon").appendChild(dv);
            
      //   let tid = 'txt-'+count.toString()+bid;

        // var inf = document.createElement("INPUT");
        // inf.setAttribute("type", "text");

        // inf.setAttribute("id", tid);
        // // if (charlen > 121 ) {
        // //   inf.setAttribute("rows", "4");
        // //   document.getElementById(tid).style.height = "200px";
        // // }
        // inf.setAttribute("value", nextImage.description);
        // inf.setAttribute("onclick","myFunction()");
        // inf.setAttribute("class", "form-control");
        // dv.appendChild(inf);
        // document.getElementById("tcon").appendChild(dv);

        // responsiveVoice.speak(array[j], "UK English Male");           
          // uvid.src = "";
          // uvid.style.display = "none";
          //showVButtons('none');
          //document.getElementById("vdo").style.display = "none";
        // iUrl = '/content/topic/Katha-girl3.png'
        document.getElementById("cmsImg").style.display = "block";
        // updateImage(nextImage.uri);
        responsiveVoice.speak(nextImage.description, "UK English Male");
        historyArea.value += nextImage.description + '\n';
        historyArea.scrollTop = historyArea.scrollHeight;
        // text(Cd, mouseX, mouseY, windowWidth - 380, 480);
        text(nextImage.description, 80, 50, windowWidth, windowHeight);            
        // narrateText(nText, iUrl);
        count++;
        if(count < globalContentJsonObj.images.length)
        setTimeout('playNextImage('+count+')', 12000); 

      }
    }


    function cplayNextImage(count, bid) { 
      var nextImage = globalContentJsonObj.images[+count];
      var vdourl = "";
      // alert(globalContentJsonObj.name);
      //var vid = document.getElementById("myVideo");
      var jid = globalContentJsonObj.id;
      // clear()
      // fill('');
      // textSize(30);

      // stroke('black');
      // strokeWeight(3);
      // clear();
      if (jid == "video") {
          
          vdourl = BASE_CMS_URL +'/'+ nextImage.uri;
          document.getElementById("cmsImg").src = "";

         //document.getElementById("cmsImg").style.display = "none";
          //document.getElementById("vdo").style.display = "block";
          //showVButtons('inline-block');
          // uvid.style.display = "block";
          // uvid.src = vdourl;
          // uvid.load();

      } else {

            bid = 'btn'+ ctr.toString();
            // alert(ctr);
            var btn = document.createElement("button");
            btn.setAttribute("class", "accordion");
            btn.setAttribute("id", bid);
            btn.setAttribute("onclick","myFunction()");

            var t = document.createTextNode(nextImage.title);
            btn.appendChild(t);
            //para.appendChild(btn);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            btn.appendChild(checkbox);
            
            document.getElementById("tcon").appendChild(btn);

            var dv = document.createElement("DIV");
            dv.setAttribute("class", "panel");
            // dv.setAttribute("style", "display: block;");
            dv.setAttribute("style", "display: block; font-size: 16px; font-family: Arial, sans-serif;");
            
            var tt = document.createTextNode(nextImage.description);
            dv.appendChild(tt);
            document.getElementById("tcon").appendChild(dv);
            
        let tid = 'txt-'+count.toString()+bid;

        var inf = document.createElement("INPUT");
        inf.setAttribute("type", "text");

        inf.setAttribute("id", tid);
        // if (charlen > 121 ) {
        //   inf.setAttribute("rows", "4");
        //   document.getElementById(tid).style.height = "200px";
        // }
        inf.setAttribute("value", "");
        inf.setAttribute("onclick","myFunction()");
        inf.setAttribute("class", "form-control");
        dv.appendChild(inf);
        document.getElementById("tcon").appendChild(dv);

        // responsiveVoice.speak(array[j], "UK English Male");           
          // uvid.src = "";
          // uvid.style.display = "none";
          //showVButtons('none');
          //document.getElementById("vdo").style.display = "none";
        // iUrl = '/content/topic/Katha-girl3.png'
        document.getElementById("cmsImg").style.display = "block";
        // updateImage(nextImage.uri);
        // responsiveVoice.speak(nextImage.description, "UK English Male");
        historyArea.value += nextImage.description + '\n';
        historyArea.scrollTop = historyArea.scrollHeight;
        // text(Cd, mouseX, mouseY, windowWidth - 380, 480);
        // text(nextImage.description, 80, 50, windowWidth, windowHeight);            
        // narrateText(nText, iUrl);
        count++;
        if(count < globalContentJsonObj.images.length)
        setTimeout('cplayNextImage('+count+')', 100); 

      }
    }
    function cplayImageList() {
 
      ctr = ctr+1;
      // bid = 'btn'+ ctr.toString();
      //       // alert(ctr);
      //       var btn = document.createElement("button");
      //       btn.setAttribute("class", "accordion");
      //       btn.setAttribute("id", bid);
      //       btn.setAttribute("onclick","myFunction()");

      //       var t = document.createTextNode("Introduction to Escape!!");
      //       btn.appendChild(t);
      //       //para.appendChild(btn);
      //       document.getElementById("tcon").appendChild(btn);
            
      cplayNextImage(0, bid);
      
    }
    function playImageList() {
      playNextImage(0);
    }
    function startmic() {
      start_button(event);
    }
    function aloadJson(jsonUri, response) {
      //alert('jsonUri - ', jsonUri);
      console.log('Locating content json: '+jsonUri);
      var axhr = new XMLHttpRequest();
      axhr.open("POST", jsonUri, true);
      axhr.withCredentials = true;
      axhr.setRequestHeader('Content-Type', 'application/json');
      axhr.onload = function() {
        if (axhr.status === 200) {
          //alert(JSON.stringify(response));
          //alert('GET JSON: ', axhr.responseText);
          globalContentJsonObj = JSON.parse(axhr.responseText);
          //alert('in NewloadJson '+ JSON.stringify(globalContentJsonObj));
          console.log('JSON received: '+JSON.stringify(globalContentJsonObj));
          //console.log(globalContentJsonObj.images.length + ' images in the json file.');
          var imglen = globalContentJsonObj.images.length;
          //alert(imglen);
        if(globalContentJsonObj.images && (globalContentJsonObj.images.length > 0))
          playImageList(); 
        }
        else {
            //alert('Request failed.  Returned status of ' + axhr.status);
            document.getElementById('statusLine').value = "Return status = " + axhr.status;
        }
      }
      axhr.send();
    }
    function cloadJson(jsonUri) {
          console.log('Locating content json: '+jsonUri);

        $.getJSON(jsonUri, function(jsonObj) {
          globalContentJsonObj = jsonObj;

          console.log('JSON received: '+JSON.stringify(globalContentJsonObj));
          console.log(globalContentJsonObj.images.length + ' images in the json file.');
          //var imglen = globalContentJsonObj.images.length;
          if(globalContentJsonObj.images && (globalContentJsonObj.images.length > 0)) {
                  // // Extract the "images" array from the JSON
                  // const imagesArray = globalContentJsonObj.images;

                  // // Create an empty array to store the converted data
                  // const storedValues = [];

                  // // Loop through the "images" array and convert each object
                  // for (const image of imagesArray) {
                  //     const item = {
                  //         thumbnail: image.thumbnail,
                  //         uri: image.uri,
                  //         title: image.title,
                  //         description: image.description,
                  //     };
                  //     storedValues.push(item);
                  // }

                  // // Now, the "storedValues" array contains the converted data
                  // console.log(storedValues);  
            cplayImageList(); 
          }
          
      });
    }


    function loadJson(jsonUri) {
          console.log('Locating content json: '+jsonUri);

        $.getJSON(jsonUri, function(jsonObj) {
          globalContentJsonObj = jsonObj;

          console.log('JSON received: '+JSON.stringify(globalContentJsonObj));
          console.log(globalContentJsonObj.images.length + ' images in the json file.');
          //var imglen = globalContentJsonObj.images.length;
          if(globalContentJsonObj.images && (globalContentJsonObj.images.length > 0))
          playImageList(); 
      });
    }
    function setBGImage() {
        //document.body.style.backgroundImage = "url('images/Katha_Speak_teen.png')";  
    } 

    const personas = [
      {
        name: 'Alice',
        greeting: 'Yeah, WHats Up!!',
        skills: ['programming', 'design'],
        display_image: 'alice.jpg',
        intro_video: 'alice_intro.mp4',
        languages_spoken: ['English', 'Spanish']
      },
      {
        name: 'Margarita',
        greeting: 'I am listening',
        skills: ['marketing', 'sales'],
        display_image: 'margarita.jpg',
        intro_video: 'bob_intro.mp4',
        languages_spoken: ['English', 'French']
      },
      {
        name: 'SPN',
        greeting: 'Hey There, nice to hear your voice!!',
        skills: ['marketing', 'sales'],
        display_image: 'margarita.jpg',
        intro_video: 'bob_intro.mp4',
        languages_spoken: ['English', 'French']
      },
      // Add more personas as needed
    ];


var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];
for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}
select_language.selectedIndex = 6;
updateCountry();
select_dialect.selectedIndex = 6;
showInfo('info_start');
function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}
var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'mic-animate.gif';
  };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };
  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
    if (final_transcript) {
      showInfo('info_start');
      var inputText = final_transcript;
      final_transcript = '';
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
      chatInput.value = inputText;
      send_txt("chatInput");
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  };
//   recognition.onresult = function(event) {
//     var interim_transcript = '';
//     for (var i = event.resultIndex; i < event.results.length; ++i) {
//       if (event.results[i].isFinal) {
//         final_transcript += event.results[i][0].transcript;
//       } else {
//         interim_transcript += event.results[i][0].transcript;
//       }
//     }
//     final_transcript = capitalize(final_transcript);
//     final_span.innerHTML = linebreak(final_transcript);
//     interim_span.innerHTML = linebreak(interim_transcript);
//     if (final_transcript || interim_transcript) {
//       //showButtons('inline-block');
//     }
//   };
// }

recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);    
    
    if (final_transcript == 'Alice'|| final_transcript == 'alice' || interim_transcript == 'Alice') {
        wakeWord = true;
          if (wakeWord) {
            uvid.src="./public/alice.mp4";
            persona = "ALICE";
            recognition.stop();
            responsiveVoice.speak("Hey, I am listening. ");
            
            historyArea.value += 'Hey, I am listening. ' + '\n';
            historyArea.scrollTop = historyArea.scrollHeight;    
            final_transcript = '';      
          } 
          setTimeout(function() {recognition.start()}, 5000);
            //showButtons('inline-block');
    }
    if (final_transcript == 'Margarita'|| final_transcript == 'Margaritha' || interim_transcript == 'Margarita') {
        wakeWord = true;
          if (wakeWord) {
            uvid.src="./public/alice.mp4";
            persona = "MARGARITA";
            recognition.stop();
            responsiveVoice.speak("Hey, I am listening. ");
            
            historyArea.value += 'Hey, I am listening. ' + '\n';
            historyArea.scrollTop = historyArea.scrollHeight;    
            final_transcript = '';      
          } 
          setTimeout(function() {recognition.start()}, 5000);
            //showButtons('inline-block');
    }
    if (final_transcript == 'Brian'|| final_transcript == 'Bryan' || interim_transcript == 'Brian') {
        wakeWord = true;
          if (wakeWord) {
            uvid.src="./public/brian.mp4";
            persona = "BRIAN";
            recognition.stop();
            responsiveVoice.speak("Hello There, Shoud I start the SOD meeting?", "UK English Male");
            
            historyArea.value += 'Hello There, Shoud I get started with the SOD meeting?' + '\n';
            historyArea.scrollTop = historyArea.scrollHeight;    
            final_transcript = '';      
          } 
          setTimeout(function() {recognition.start()}, 5000);
            //showButtons('inline-block');
    }
    if (final_transcript == 'SPN'|| final_transcript == 'SRI' || interim_transcript == 'SPN'|| interim_transcript == 'SRI') {
        wakeWord = true;
          if (wakeWord) {
            uvid.src="./public/spn.mp4";
            persona = "SPN";
            recognition.stop();
            responsiveVoice.speak("Hey There, Been a Long time?", "UK English Male");
            
            historyArea.value += 'Hey There, Been a Long time?' + '\n';
            historyArea.scrollTop = historyArea.scrollHeight;    
            final_transcript = '';      
          } 
          setTimeout(function() {recognition.start()}, 5000);
            //showButtons('inline-block');
    }

    // if (recognizing && wakeWord == true) {
      if (final_transcript.length >= 2){
        recognition.stop();
        chatInput.value = final_transcript;
        var inputText = final_transcript;
        var sb = final_transcript;
        final_transcript = '';  
        recognizing = false;
        historyArea.value += 'me>> '+ sb + '\n';
        historyArea.scrollTop = historyArea.scrollHeight;
        final_span.innerHTML = '';
        interim_span.innerHTML = '';
        chatInput.value = inputText;
        send_txt("chatInput");
        sendConverse(sb);

      }
    // }
  };
}



function wakeWordF(event) {
  
  final_transcript = '';
  recognition.lang = select_dialect.value;
  if (!recognizing && wakeWord == false) {
    recognition.start();
    wakeWord == true;
  }
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  //start_img.src = 'mic-slash.gif';
  showInfo('info_allow');
  showButtons('none');
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
function createEmail() {
  var n = final_transcript.indexOf('\n');
  if (n < 0 || n >= 80) {
    n = 40 + final_transcript.substring(40).indexOf(' ');
  }
  var subject = encodeURI(final_transcript.substring(0, n));
  var body = encodeURI(final_transcript.substring(n + 1));
  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}
function sendButton() {
  //send_button.style.display = 'none';
  var sb = chatInput.value;
  historyArea.value += 'me>> '+ sb + '\n';
  historyArea.scrollTop = historyArea.scrollHeight;
  chatInput.value = '';
  // siteControls(sb);
  sendConverse(sb);
  //kathaConverse(sb);
}
function copyButton() {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
  copy_button.style.display = 'none';
  copy_info.style.display = 'inline-block';
  showInfo('');
}
function emailButton() {
  if (recognizing) {
    create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    createEmail();
  }
  email_button.style.display = 'none';
  email_info.style.display = 'inline-block';
  showInfo('');
}
function startButton(event) {
  
  if (recognizing) {
    recognition.stop();
    showButtons('inline-block');
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'mic-slash.gif';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;

}
function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}
var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
  //send_button.style.display = style;
  //copy_button.style.display = style; 
  //email_button.style.display = style;
 // copy_info.style.display = 'none';
 // email_info.style.display = 'none';
}
