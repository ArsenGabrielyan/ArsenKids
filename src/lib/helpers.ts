export function isChristmas(){
     const today = new Date();
     const month = today.getMonth() + 1,day = today.getDate();
     return (month === 12 && day >= 6) || (month === 1 && day <= 10);
}