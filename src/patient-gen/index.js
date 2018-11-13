const { shuffle, WordPool } = require('../util');
const JobsPool = require('./jobs.json');

const ROLES = ['A', 'B', 'C', 'D']
const MIN_JOBS = 1
const MAX_JOBS = 3
const TRIAGE_CATEGORIES = ['1', '2', '3', '4', '5']
const TRIAGE_COLORS = ['#FFFFFF', '#000000', '#DE4768', '#F2A040', '#0AB45A', '#2A74F6']
const ROLE_COLORS = {'ABCD':TRIAGE_COLORS[0], 'A':TRIAGE_COLORS[1], 'B':TRIAGE_COLORS[2], 'C':TRIAGE_COLORS[4], 'D':TRIAGE_COLORS[5]}
const JOINS = ['~~~', ' THEN', ' AND']

const CARD_COUNT = 48 // 48 standard, 2 Quarantine, 2 Monitored, 2 Isolated (all triage 5)

const FirstsPool = new WordPool(['Mariam', 'Fatema', 'Jouri', 'Sarah', 'Leanne', 'Mohammed', 'Ahmad', 'Omar', 'Ali', 'Youssef', 'Isabella', 'Emma', 'Olivia', 'Catalina', 'Martina', 'Benjamin', 'Felipe', 'Bautista', 'Mateo', 'Valentino', 'Olivia', 'Charlotte', 'Isla', 'Ava', 'Mia', 'Oliver', 'Noah', 'William', 'Jack', 'Jackson', 'Emma', 'Mila', 'Jade', 'Luna', 'Louise', 'Raphaël', 'Liam', 'Lucas', 'Noah', 'Léo', 'Saanvi', 'Aadya', 'Kiara', 'Diya', 'Pihu', 'Muhammad', 'Reyansh', 'Aarav', 'Atharv', 'Vivaan', 'Siyabonga', 'Melokuhle', 'Lethabo', 'Banele', 'Samkelo', 'Amahle', 'Minenhle', 'Rachida', 'Melokuhle', 'Lesedi'])
const SursPool = new WordPool(['Rasulov', 'Zhang', 'Bishwas', 'Saito', 'Kwon', 'Gurung', 'Herath', 'Ozdemir', 'Nguyen', 'Sargsyan', 'Reiter', 'Mihaylov', 'Jukic', 'Olsen', 'Durand', 'Roux', 'Juhasz', 'Colombo', 'Attard', 'De Wit', 'Correia', 'Smith', 'Wilson', 'Williams', 'Brown', 'Taylor', 'Jones', 'Singh', 'Wang', 'Anderson', 'Lee', 'Fernandez', 'Rodríguez', 'González', 'García', 'López', 'Ramos', 'Núnez', 'Rossi', 'Silva', 'Méndez'])

const ImagePool = new WordPool(['injury.jpg', 'sick.jpg'])

function findTasksForRole(role, previous) {
  let arr = []
  let final = []
  //console.log("length:" + role.length + " 1: " +role[0] + " 2: " + role[1] + " 3: " +role[2] + " 4: " + role[3])
  
  for (var k in JobsPool){
    for (i = 0; i < JobsPool[k].length; i++) {
      if (JobsPool[k][i] == role[0]) {
        arr.push(k)
      }
    } 
  }

  if (role.length == 1) {
    final = arr
  } else if (role.length == 2) {
    let arr2 = []
    for (var k in JobsPool) {
      for (i = 0; i < JobsPool[k].length; i++) {
        if (JobsPool[k][i] == role[1]) {
          arr2.push(k)
        }
      }
    }

   for (let x of arr) { if (!arr2.some(y => y == x)) { final.push(x); }}
  } else if (role.length == 4) {
    for (var k in JobsPool) {
      if (JobsPool[k] == "A,B,C,D") {
        final.push(k)
      }
    }
  }

  final = shuffle(final)
  for (var k in previous) {
    for (var i in final)
      if (previous[k][0] == final[i]) {
        final.splice(i,1)
      }
    }
  result = final.pop()
  return result
}

function getRandomListEntry(list) {
  return list[Math.floor(Math.random()*list.length)]
}

function createJob() {
  const p = Math.random()
  const roles = shuffle(ROLES.slice(0))

  if (p < 0.2) {
    return ROLES.join('') // All
  } else if (p < 0.6) {
    return roles.pop() + roles.pop() // Two
  } else {
    return roles.pop() // Just one
  }
}

function createJobList() {
  const p = Math.random()

  if (p < 0.2) {
    return [createJob()]
  } else if (p < 0.6) {
    return [createJob(), createJob()]
  } else {
    return [createJob(), createJob(), createJob()]
  }
}

// Takes 2-4 jobs and creates a sequence from them, joined using AND, THEN, WHILE
function createJobSequence(jobs) {
  let result = []

  for (let i = 0; i < jobs.length - 1; i++) {

    result.push([findTasksForRole(jobs[i], result), getRandomListEntry(JOINS), jobs[i]])
    //result += findTasksForRole(jobs[i], result) + getRandomListEntry(JOINS) + '\n'
  }
  result.push([findTasksForRole(jobs[jobs.length - 1], result), "", jobs[jobs.length - 1]])
  //result += findTasksForRole(jobs[jobs.length - 1], result)

  return result
}

function findRoles(jobList) {
  // Take a list of jobs, pull the roles out and return an array of colours for the icons of each task
  let result = [['#FFFFFF','#FFFFFF','#FFFFFF'],['#FFFFFF','#FFFFFF','#FFFFFF'],['#FFFFFF','#FFFFFF','#FFFFFF']] //[fir, sec, out] x3 tasks

  for (var i in jobList) {
    if (jobList[i][2] == 'ABCD') {
      result[i] = [ROLE_COLORS["ABCD"], '#FFFFFF', "#000000"]
    } else {
      if (jobList[i][2].length == 1) {
        result[i][1] = "#FFFFFF"
      }

      for (let l = 0; l < jobList[i][2].length; l++) {
        if (jobList[i][2].charAt(l)) {
          result[i][l] = ROLE_COLORS[ jobList[i][2].charAt(l) ]
        } else {result[i][l] = "#FFFFFF"}
      }
      result[i][2] = result[i][0]
    }
  }

  return result
}

function makePlausibleName() {  
  return FirstsPool.getWord() + ' ' + SursPool.getWord()
}

function createPatient(jobs, triage) {
  return {
    name: makePlausibleName(),
    triage,
    jobs,
    hex: TRIAGE_COLORS[triage],
    roles: findRoles(jobs),
  }
}

const patients = []
const triages = []
let triagePool = shuffle(TRIAGE_CATEGORIES.slice(0))
for (let i = 0; i < CARD_COUNT; i++) {
  const triage = triagePool.pop()

  patients.push(
    createPatient(createJobSequence(createJobList()), triage)
  )

  triages.push(parseInt(triage))

  if (triagePool.length === 0) {
    triagePool = shuffle(TRIAGE_CATEGORIES.slice(0))
  }
}

console.log(JSON.stringify(patients));