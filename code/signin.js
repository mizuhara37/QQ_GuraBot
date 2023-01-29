const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./usrdata/signin');
const axios = require('axios');
const dayjs = require('dayjs');
var luck,flag=false;
const day = parseInt(dayjs().format('DD'));
const month = parseInt(dayjs().format('MM'));

class signin {
    constructor (client) {
        this.client = client;
    }
    
    refresh (id) {
        const now = dayjs().format('DD/MM/YYYY');
       
        if (now !== storage.getItem('date')) 
        { 
            storage.setItem('user', '{}');
            storage.setItem('seed', Math.round(Math.random() * 100));
            storage.setItem('date', now);
            storage.setItem('first','0');
        }
    }
    
    attempt (id) {
        let list = storage.getItem('user');
        if (!list) storage.setItem('user', '{}');
        list = JSON.parse(list);
        const attempt = list[id];
        
        if (!attempt) {
            list[id] = 1;
            storage.setItem('user', JSON.stringify(list));
            return 1;
        }
        list[id] = attempt + 1;
        storage.setItem('user', JSON.stringify(list));
        return attempt + 1;
    }
    activate () {
        logger.info('签到组件加载成功！');
    }
    
    async onGroupMessage (session) {
        // console.log(session.user_id);
        this.refresh(session.group_id);
        if ((session.raw_message === '签到') && (session.group_id === 661222218)) {
            const attempt = await this.attempt(parseInt(session.user_id));
       
                 if (attempt <= 1) {
                const jrrp = parseInt(session.user_id / this.seed % 101);
                var x=jrrp;
                const fs = require('fs')
                const { createCanvas, loadImage } = require('canvas')

                const width = 600
                const height = 600
                
                const canvas = createCanvas(width, height)
                const context = canvas.getContext('2d')
                
                var los;
                var today_day=dayjs().day();
                if(today_day==0) today_day="日";
                else if(today_day==1) today_day="一";
                else if(today_day==2) today_day="二";
                else if(today_day==3) today_day="三";
                else if(today_day==4) today_day="四";
                else if(today_day==5) today_day="五";
                else if(today_day==6) today_day="六";

                var today_month=dayjs().month()+1;
                
                if(today_month==1 || today_month==3 || today_month==5 || today_month==7 || today_month==8 || today_month==10 || today_month==12) los="大";
                else los="小";

                if(today_month==1) today_month="一";
                else if(today_month==2) today_month="二";
                else if(today_month==3) today_month="三";
                else if(today_month==4) today_month="四";
                else if(today_month==5) today_month="五";
                else if(today_month==6) today_month="六";
                else if(today_month==7) today_month="七";
                else if(today_month==8) today_month="八";
                else if(today_month==9) today_month="九";
                else if(today_month==10) today_month="十";
                else if(today_month==11) today_month="11";
                else if(today_month==12) today_month="12";
                var today_date=dayjs().date();
                
                context.fillStyle = 'white'
                context.fillRect(0, 0, width, height)
                
                context.font = 'bold 130pt Menlo'
                context.textAlign = 'center'
                context.textBaseline = 'top'
                context.fillStyle = "white"
                
                const text = today_date;
                
                const textWidth = context.measureText(text).width
                context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
                context.fillStyle = 'green'
                context.fillText(text, 300, 70)
                
                context.fillStyle = 'green'
                context.font = 'bold 25pt Menlo'
                context.fillText(today_month,150,110)
                
                context.fillStyle = 'green'
                context.font = 'bold 25pt Menlo'
                context.fillText('月',150,160)
                
                context.fillStyle = 'green'
                context.font = 'bold 25pt Menlo'
                context.fillText(los,150,210)
                
                context.fillStyle = 'green'
                context.font = 'bold 25pt Menlo'
                context.fillText('星',450,110)
                
                context.fillStyle = 'green'
                context.font = 'bold 25pt Menlo'
                context.fillText('期',450,160)
                
                context.fillStyle = 'green'
                context.font = 'bold 25pt Menlo'
                context.fillText(today_day,450,210)
                
                 var col,txt;
                if(x>=0 && x<=49) col='grey';
                else if(x>=50 && x<=60) col='green';
                else  if(x>60) col='red';

                if(x>=0 && x<=25) txt="大凶";
                else if(x>25 && x<50) txt="小凶";
                else  if(x>=50 &&x<=60) txt="中平";
                else if(x>60 && x<=75) txt="小吉";
                else if(x>75) txt="大吉";
                context.fillStyle = 'black'
                context.font = 'bold 30pt Menlo'
                context.fillText('签到成功！今日人品:'+jrrp, 300, 330)
                
                context.fillStyle = col;
                context.font = 'bold 60pt Menlo'
                context.fillText(txt, 300, 430)
                // const width = 1200
                // const height = 630

                // const canvas = createCanvas(width, height)
                // const context = canvas.getContext('2d')

                // context.fillStyle = '#000'
                // context.fillRect(0, 0, width, height)

                // context.font = 'bold 70pt Menlo'
                // context.textAlign = 'center'
                // context.textBaseline = 'top'
                // context.fillStyle = '#3574d4'

                // const text = '签到成功'

                // const textWidth = context.measureText(text).width
                // context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
                // context.fillStyle = '#fff'
                // context.fillText(text, 600, 170)

                // context.fillStyle = '#fff'
                // context.font = 'bold 30pt Menlo'
                // context.fillText('今日人品:'+jrrp, 600, 330)

               

                // context.fillStyle = col;
                // context.font = 'bold 60pt Menlo'
                // context.fillText(txt, 600, 430)

                loadImage('./JustBackground.png').then(image => {
                // context.drawImage(image, 340, 515, 70, 70)
                const buffer = canvas.toBuffer('image/png')
                 fs.writeFileSync('./usrdata/signin/'+session.user_id+'.png', buffer)
                 const { segment } = require("oicq")
                const me = [
                    segment.image("./usrdata/signin/"+session.user_id+".png"),
                ]
                session.reply(me);
                })

                
            } else {
                const { segment } = require("oicq")
                const me = [
                    segment.image("./usrdata/signin/"+session.user_id+".png"),
                ]
                session.reply(me);
            } 
        }
    }

    get seed () {
        return parseInt(storage.getItem('seed'));
    }
}

module.exports = signin;