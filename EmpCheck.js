console.log("Welcome to EmpWage Calculation Program in JS")
//CONSTANTS
const IS_FULL_TIME = 2;
const IS_ABSENT = 0;
const IS_PART_TIME = 1;
const WAGE_PER_HR = 20;
const FULL_DAY_HOURS = 8;
const PART_TIME_HOURS = 4;
const MAX_WORKING_DAY_PER_MONTH = 20;
const MAX_WORKING_HRS_PER_MONTH = 100;

//Variables
let monthlyEmpWage = 0;
let dailyWorkingHrs = 0;
let totalWorkingHrs = 0;
let totalWorkingDays = 0;
let totalEmpWage = 0;
//Daily EmpWage in Array
let dailyEmpWageArray = new Array();
//Daily EmpWage in Map
let dailyEmpWageMap = new Map();

while(totalWorkingDays < MAX_WORKING_DAY_PER_MONTH && totalWorkingHrs < MAX_WORKING_HRS_PER_MONTH){
    dailyWorkingHrs = GetWorkingHrs();
    dailyEmpWageArray.push(GetDailyWage(dailyWorkingHrs));
    totalWorkingHrs += dailyWorkingHrs;
    totalWorkingDays++;
    dailyEmpWageMap.set(totalWorkingDays,GetDailyWage(dailyWorkingHrs));
}
console.log(dailyEmpWageMap);
console.log("UC8A:- Total EmpWage by Map: " +Array.from(dailyEmpWageMap.values()).reduce(TotalEmpWages,0))
//UC7A
function sum(dailyWage){
    totalEmpWage += dailyWage;
}
dailyEmpWageArray.forEach(sum);
function TotalEmpWages(totalEmpWage,dailyWage){
    return totalEmpWage+dailyWage;
}
console.log("UC7A:- TotalEmpWage by Reduce Method :" +dailyEmpWageArray.reduce(TotalEmpWages,0));
//UC7B
let dailyCounter = 0;
function MapDayWithWage(dailyWage){
    dailyCounter++;
    return dailyCounter +"=" +dailyWage;
}
let mapDayWithWageArray = dailyEmpWageArray.map(MapDayWithWage);
console.log("UC7B Wage with Day " + mapDayWithWageArray);
console.log("Employee wage for this month is "+ monthlyEmpWage+ " Total hrs & days worked are "+totalWorkingHrs+ ", "+totalWorkingDays);
//UC7C
function FullTimeWage(dailyWage){
    return dailyWage.includes(160);
}
let fullDayWageArray = mapDayWithWageArray.filter(FullTimeWage);
console.log("UC7C:- Daily Wage filter when fullWage earned "+ fullDayWageArray);

//UC7D
function FindFirstOccurenceOfFullTimeWage(dailyWage){
    return dailyWage.includes("160");
}
console.log("UC7D:- First Occurence of Full Time Wage: " + mapDayWithWageArray.find(FindFirstOccurenceOfFullTimeWage));

//UC7E 
function IsAllTimeFullWage(dailyWage){
    return dailyWage.includes("160");
}
console.log("UC7E:- Check all elements have full time wage: "+ fullDayWageArray.every(IsAllTimeFullWage));

//UC7F
function IsAnyPartTimeWage(dailyWage){
    return dailyWage.includes("80");
}
console.log("UC7F:- If any part time wage is there: "+mapDayWithWageArray.some(IsAnyPartTimeWage));

//UC7G
function NoOfDaysEmployeePresentOrPartTime(numOfDays,dailyWage){
    if(dailyWage>0) return numOfDays+1;
    return numOfDays;
}
console.log("UC7G:- No of days employee present or part time: "+dailyEmpWageArray.reduce(NoOfDaysEmployeePresentOrPartTime,0));

//Method to get Work Hours
function GetWorkingHrs(){
    let empCheck;
    empCheck = Math.floor(Math.random() * 10) % 3;
    switch(empCheck){
        case IS_ABSENT:
            return 0;
            break;
        case IS_PART_TIME:
            return PART_TIME_HOURS;
            break;
        case IS_FULL_TIME:
            return FULL_DAY_HOURS;
            break;
    }
}
function GetDailyWage(dailyWorkingHrs){
    return dailyWorkingHrs * WAGE_PER_HR;
}
