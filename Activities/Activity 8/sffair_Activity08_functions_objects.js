/**
 * @author Sullivan Fair
 * email: sffair@iastate.edu
 * Date: Wednesday, September 27, 2023
 */

/**
 * Exercise 1
 */
function maxOfTwo(n1, n2)
{
    if(n1 < n2)
    {
        return n2;
    }
    else
    {
        return n1;
    }
}

let n1 = 11;
let n2 = 10;
console.log(`The max between ${n1} and ${n2} is:`, maxOfTwo(n1, n2));

/**
 * Exercise 2
 */
function maxOfArray(array)
{
    var max = array[0];
    for(i = 1; i < array.length; i++)
    {
        if(array[i] > max)
        {
            max = array[i];
        }
    }

    return max;
}

let array = [10, 11, 1024, 125, 9, 201];
console.log(maxOfArray(array));

/**
 * Exercise 3
 */
function showProperties(movie)
{
    console.log("List of Keys:")
    for(let key in movie)
    {
        console.log(key);
    }

    console.log("List of Values:")
    values = Object.values(movie);
    var i = 0;
    while(values[i] != null)
    {
        console.log(values[i]);
        i++;
    }
}

const movie = {
    title : 'Some movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg'
};

showProperties(movie);

/**
 * Exercise 4
 */
const circle = {
    radius: 2,
    area: function(){
        return Math.PI * this.radius * this.radius;
    }
};

console.log(circle.area());

/**
 * Exercise 5
 */
const newCircle = {
    radius: 2,
    get radiusValue(){
        return this.radius;
    },
    set radiusValue(val) {
        this.radius = val;
        return this.radius;
    },
    area: function(){
        return Math.PI * this.radius * this.radius;
    }
};

console.log(`Area with ${newCircle.radiusValue} :`,newCircle.area());
newCircle.radiusValue = 3;
console.log(`Area with ${newCircle.radiusValue} :`,newCircle.area());