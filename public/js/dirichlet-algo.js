function engCalc(string){
  switch(string){
    case "one" :
      return 1;
    case "two" :
      return 2;
    case "three" :
      return 3;
    case "four" :
      return 4;
    case "five" :
      return 5;
  }
}

function sortIntoObj(arr){
  let ratingObj = {
    one : 0,
    two : 0,
    three : 0,
    four : 0,
    five : 0
  };
  arr.map(function(value,index){
    switch(value){
      case 1 :
        ratingObj.one += 1;
        break;
      case 2 :
        ratingObj.two += 1;
        break;
      case 3 :
        ratingObj.three += 1;
        break;
      case 4 :
        ratingObj.four += 1;
        break;
      case 5 :
        ratingObj.five += 1;
        break;
    }
  })
  return ratingObj;
}

function sknkCalc(obj,N,K){
  let sknkCalcObj = {
    one : 0,
    two : 0,
    three : 0,
    four : 0,
    five : 0
  };
  for (keys in obj){
    sknkCalcObj[keys] =  engCalc(keys) * ((obj[keys] + 1) / (N + K));
  }
  return sknkCalcObj;
}

function sk2nkCalc(obj,N,K){
  let sk2nkCalcObj = {
    one : 0,
    two : 0,
    three : 0,
    four : 0,
    five : 0
  };
  for (keys in obj){
    sk2nkCalcObj[keys] =  Math.pow(engCalc(keys),2) * ((obj[keys] + 1) / (N + K));
  }
  return sk2nkCalcObj;
}

function sumObj(obj){
  let res = 0;
  for (keys in obj){
    res += obj[keys];
  }
  return res;
}

function calcInter(num1,num2,N,K){
  return Math.pow((num2 - Math.pow(num1,2)) / (N + K + 1), 0.5);
}

function finalRes(num1,num2,z){
  return num1 - z*(num2);
}

function dirichletAlgo(arr,N,K,z){
  let tempObj = sortIntoObj(arr);
  // console.log(tempObj);
  let obj1 = sknkCalc(tempObj,N,K);
  // console.log(obj1);
  let obj2 = sk2nkCalc(tempObj,N,K);
  // console.log(obj2);
  let sum1 = sumObj(obj1);
  // console.log(sum1);
  let sum2 = sumObj(obj2);
  // console.log(sum2);
  let inter = calcInter(sum1,sum2,N,K);
  // console.log(inter);
  let final = finalRes(sum1,inter,z);
  // console.log(final);
  return final;
}


// console.log(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]));
// console.log(sknkCalc(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]),11,5));
// console.log(sk2nkCalc(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]),11,5));
// console.log(sumObj(sknkCalc(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]),11,5)));
// let a = sumObj(sknkCalc(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]),11,5));
// console.log(sumObj(sk2nkCalc(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]),11,5)));
// let b = sumObj(sk2nkCalc(sortIntoObj([3,5,5,1,1,1,1,1,1,1,1]),11,5));
// console.log(a,b);
// console.log(calcInter(a,b,11,5));
// let c = calcInter(a,b,11,5);
// console.log(finalRes(a,c,1.65));
// console.log('---------------------------------------------');
// console.log(dirichletAlgo([3,5,5,1,1,1,1,1,1,1,1],11,5,1.65));

module.exports = dirichletAlgo;
