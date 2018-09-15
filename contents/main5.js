var ros = new ROSLIB.Ros({ url : 'ws://' + location.hostname + ':9000' });

ros.on('connection', function() {console.log('websocket: connected'); });
ros.on('error', function(error) {console.log('websocket: error: ', error); });
ros.on('close', function() {console.log('websocket: closed'); });

var ls = new ROSLIB.Topic({
    ros : ros,
    name : '/lightsensors',
    messageType : 'pimouse_ros/LightSensorValues'
});

ls.subscribe(function(message) {
    for (e in message) {
        document.getElementById(e).innerHTML = message[e];
    }
});

var on = new ROSLIB.Service({
    ros : ros,
    name : '/motor_on',
    messageType : 'std_srvs/Trigger'
});

var off = new ROSLIB.Service({
    ros : ros,
    name : '/motor_off',
    messageType : 'std_srvs/Trigger'
});

document.getElementById('motor_on').addEventListener('click', function(e){
    on.callService(ROSLIB.ServiceRequest(), function(result){
        if (result.success) {
            document.getElementById('motor_on').className = 'btn btn-danger';
            document.getElementById('motor_off').className = 'btn btn-default';
        }
    });
});

document.getElementById('motor_off').addEventListener('click', function(e){
    off.callService(ROSLIB.ServiceRequest(), function(result){
        if (result.success) {
            document.getElementById('motor_on').className = 'btn btn-default';
            document.getElementById('motor_off').className = 'btn btn-primary';
        }
    });
});

document.getElementById('camstream').data = 'http://'
    + location.hostname
    + ':10000/stream?topic=/cv_camera_node/image_raw';

