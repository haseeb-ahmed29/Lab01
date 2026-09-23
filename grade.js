const studentName = "Aisha";
const scores = [78,92,85,66,90]  // an array: a list of numbers

//Create function for reusable block of code:
function calculateAverage(numbers){
    let total = 0;

    //A loop repeats an action for every item
    for(let i=0; i<numbers.length; i++){
        total = total + numbers[i];
    }
    return total/numbers.length
}

const average = calculateAverage(scores)

//for making a decision we are using if/else:
if(average>=80){
    console.log(studentName + ", great work! your average is + " + average.toFixed(1));
}else{
    console.log(studentName + ", your average is + " + average.toFixed(1) + ". keep practicing");
}