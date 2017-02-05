/* * 
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 * 
 * licenced under the MIT license
 * 
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 * 
 * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

	var width,height;
    var audio;
    var ctx;
    var analyser;
    var audioSrc;
    var frequencyData;
    var canvas,
        cwidth,
        cheight,
        meterWidth,
        gap,
        capHeight,
        capStyle,
        meterNum,
        capYPositionArray = [];
 
 
	function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        //canvas.width = width;
        //canvas.height = height;
    }
 
    function renderFrame() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * (meterWidth+gap) , cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * (meterWidth+gap) , cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };
            ctx.fillStyle = "#ffffff"; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * (meterWidth+gap) , cheight - value + capHeight, meterWidth, cheight); //the meter
        }
        requestAnimationFrame(renderFrame);
    }
	
window.onload = function() {
	width = window.innerWidth;
    height = window.innerHeight;
    audio = document.getElementById('audio');
    ctx = new AudioContext();
    analyser = ctx.createAnalyser();
    audioSrc = ctx.createMediaElementSource(audio);
    // we have to connect the MediaElementSource with the analyser 
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    // analyser.fftSize = 64;
    // frequencyBinCount tells you how many values you'll receive from the analyser
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    // we're ready to receive some data!

		canvas =document.getElementById('canvas');
        cwidth = window.innerWidth;
        cheight = canvas.height - 2;
        meterWidth = 10; //width of the meters in the spectrum
        gap = 2; //gap between meters
        capHeight = 2;
        capStyle = '#fff';
        meterNum = window.innerWidth / (meterWidth+gap); //count of the meters
        //capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
		ctx = canvas.getContext('2d');
		
    //gradient = ctx.createLinearGradient(0, 0, 0, 300);
    //gradient.fillStyle="#0000ff";
   // gradient.addColorStop(0.5, '#ff0');
   // gradient.addColorStop(0, '#f00');
    // loop
//resize()

    renderFrame();
	audio.play();
	//var song = 0;
	audio.src = "bgm.mp3"
    audio.play();
	
	audio.onended = function() {
		/*song++;
		if(song==3){
			song=0;
		}
		audio.src = song.toString()+".mp3";*/
		audio.play();
	}
};

window.onresize = function(){ 
	width = window.innerWidth;
    height = window.innerHeight;
	cwidth = window.innerWidth;
    cheight = canvas.height - 2;
	meterWidth = 10; //width of the meters in the spectrum
    gap = 2; //gap between meters
    capHeight = 2;
    capStyle = '#fff';
    meterNum = window.innerWidth / (meterWidth+gap); //count of the meters
}
