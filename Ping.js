var request = require('request'),
    statusCodes = require('http').STATUS_CODES;

function Ping (opts){
    this.website = '';

    //ping intervals in minutes
    this.timeout = 5

    this.statusCode = statusCodes

    //interval handler
    this.handle = null;

    //initialize the app
    this.init(opts)
}

/*
* Methods
*/
Ping.prototype = {
    init: function (opts){
        var self = this;

        self.website = opts.website;

        self.timeout = (opts.timeout * (60 * 1000));

        //start monitoring
        self.start();
    },
    start:function () {
        var self = this,
            time = Date.now();

        console.log("\nLoading... " + self.website + "\nTime: " + time + "\n" + "StatusCode :" + statusCodes);

        //create an interval for pings
        self.handle = setInterval(function () {
            self.ping();
        },self.timeout);
    },
    ping: function () {
        var self = this, currentTime = Date.now();

        try {
            //send request
            request(self.website, function (error,res) {
                //website is up
                if (!error && res.statusCode === 200){
                    self.isOk();
                }

                //No error but website not ok
                else{
                    self.isNotOk();
                }
            });
        }
        catch (err) {
            self.isNotOk();
        }
    },


    isOk:function () {
        this.log('UP','OK');
    },

    isNotOk: function (statusCode) {
        var time =  Date.now(),
            self = this,
            time = self.getFormatedDate(time),
            msg = statusCodes[statusCode + ''],

        htmlMsg = '<p>Time: ' + time;
        htmlMsg +='</p><p>Website: ' + self.website;
        htmlMsg += '</p><p>Message: ' + msg + '</p>';

        this.log('DOWN', msg);

    },

    log: function (status, msg) {
        var self = this,
            time = Date.now(),
            output = '';

        output += "\nWebsite: " + self.website;
        output += "\nTime: " + time;
        output += "\nStatus: " + status;
        output += "\nMessage:" + msg  + "\n";

        console.log(output);
    },

    getFormatedDate: function (time) {
        var currentDate = new Date(time);

        currentDate = currentDate.toISOString();
        currentDate = currentDate.replace(/T/, ' ');
        currentDate = currentDate.replace(/\..+/, '');

        return currentDate;
    }

}

module.exports = Ping;

















