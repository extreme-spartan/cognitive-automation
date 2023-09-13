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
        backgroundColor: severities.map(severity => getColor(category, severity)),
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
                    console.log(squad, lbl, value);
                    ctx.fillText(value, x, y);
                    if (storedValues.length < 35) {
                    storedValues.push({ squad: squad, label: lbl, data: data, x: x, y: y });
                    console.log(storedValues.length);
                    
                    }
                });
            }
        }
    },
    plugins: {
        title: {
            display: true,
            color: "blue",
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
// backgroundColor: categoryColors.Predicted,
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
        console.log(`Squad: ${squad}, Label: ${label}, Data: ${data}, X: ${x}, Y: ${y}`);
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
                    canvas.click();
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

                speakWithBuffer(announcementText).then(bufferArray => {
                    audioBuffers.push(...bufferArray);
                });
                if (index == 34){
                    recordBtn.click();
                }

    }, index * 7000); // Delay of 7 seconds (7000 milliseconds)
});

}

// Announce the predicted severity after 3 seconds
setTimeout(retrieveValuesWithDelay, 7000);

// const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const recordBtn = document.querySelector("button");

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
            mimeType: 'video/webm;',
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
// speakWithBuffer("Hi Squad Leaders and others, Thanks for joining the Daily Incident Status Meeting.");
const announcementText = "Hi Squad Leaders and others, Thanks for joining the Daily Incident Status Meeting.";
speakWithBuffer(announcementText).then(bufferArray => {
audioBuffers.push(...bufferArray);
});
setTimeout(retrieveValuesWithDelay, 5000);
// canvas.addEventListener("mousemove", handleMouseMove);
}

// Function to stop recording canvas events and text-to-speech audio
async function stopCanvasEventRecording() {
var storedValues = [];
const announcementText = "Thanks for attending the meeting, the session is now open for questions and clarification.";
const bufferArray = await speakWithBuffer(announcementText).then(bufferArray => {
audioBuffers.push(...bufferArray);
});;
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
            myChartCanvas.width = initialMyChartWidth;
            myChartCanvas.height = initialMyChartHeight;
        }
        // slidePane.style.right = "-400px";
    };
}
});
