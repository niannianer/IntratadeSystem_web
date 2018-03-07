/**
 * Created by DELL on 2017/6/6.
 */

export let timeFormat = (input) => {
    if (!input) {
        return '';
    }
    let newDate = new Date();
    newDate.setTime(input);
    let y = newDate.getFullYear();
    let m = newDate.getMonth()+1;
    let d = newDate.getDate();
    let h = newDate.getHours();
    let f = newDate.getMinutes();
    let s = newDate.getSeconds();
    let setTime = (t)=>{
        if(t<10){
            return '0' + t;
        }
        return t ;
    }
    let ouputs = (y+'-'+setTime(m)+'-'+setTime(d)+' '+setTime(h)+':'+setTime(f)+':'+setTime(s));
    return ouputs;
};

