const getAge = function (person) {
 person.yearofdeath ??= new Date().getFullYear

 return person.yearofdeath - person.birthyear
  
};

const findTheOldest = function (people) {
people.sort((current, next)=> getAge(current) - getAge(next))

oldest = people[0]
return oldest

  
};
