class WordPool {
  constructor(words) {
    this.originalWords = words.slice(0)
    this.words = shuffle(words.slice(0))
  }

  getWord() {
    if (this.words.length > 0) {
      return this.words.pop()
    }

    this.words = shuffle(this.originalWords.slice(0))
    return this.words.pop()
  }
}

const ROLES = ['A', 'B', 'C', 'D']
const MIN_JOBS = 1
const MAX_JOBS = 3
const TRIAGE_CATEGORIES = ['1', '2', '3', '4', '5']
const JOINS = [',', ' THEN', ' AND']

const CARD_COUNT = 24 // 54

const FirstsPool = new WordPool(['Mariam', 'Fatema', 'Jouri', 'Sarah', 'Leanne', 'Mohammed', 'Ahmad', 'Omar', 'Ali', 'Youssef', 'Isabella', 'Emma', 'Olivia', 'Catalina', 'Martina', 'Benjamin', 'Felipe', 'Bautista', 'Mateo', 'Valentino', 'Olivia', 'Charlotte', 'Isla', 'Ava', 'Mia', 'Oliver', 'Noah', 'William', 'Jack', 'Jackson', 'Emma', 'Mila', 'Jade', 'Luna', 'Louise', 'Raphaël', 'Liam', 'Lucas', 'Noah', 'Léo', 'Saanvi', 'Aadya', 'Kiara', 'Diya', 'Pihu', 'Muhammad', 'Reyansh', 'Aarav', 'Atharv', 'Vivaan', 'Siyabonga', 'Melokuhle', 'Lethabo', 'Banele', 'Samkelo', 'Amahle', 'Minenhle', 'Thandolwethu', 'Melokuhle', 'Lesedi'])
const SursPool = new WordPool(['Rasulov', 'Zhang', 'Bishwas', 'Saito', 'Kwon', 'Gurung', 'Herath', 'Ozdemir', 'Nguyen', 'Sargsyan', 'Reiter', 'Mihaylov', 'Jukic', 'Olsen', 'Durand', 'Roux', 'Juhasz', 'Colombo', 'Attard', 'De Wit', 'Correia', 'Smith', 'Wilson', 'Williams', 'Brown', 'Taylor', 'Jones', 'Singh', 'Wang', 'Anderson', 'Lee', 'Fernandez', 'Rodríguez', 'González', 'García', 'López', 'Ramos', 'Núnez', 'Rossi', 'Silva', 'Méndez'])

const JobsPool = {'Chest X-ray' : ['A','D'], 'Hip X-ray' : ['D'], 'Limb X-ray' : ['D'], 'Abdominal X-ray' : ['D'], 'Lumbar Puncture' : ['A'], 'Electrocardiogram' : ['B','C'], 'Take bloods' : ['A','B','C','D'], 'Send a urine sample' : ['A','B','C','D'], 'Send a sputum sample' : ['A','B','C','D'], 'Send a stool sample,' : ['A','B','C','D'], 'Take and send a swab' : ['A','B','C','D'], 'Document allergies' : ['A','B','C','D'], 'Place a cannula' : ['A','B','C'], 'Place a catheter' : ['A','C'], 'Place a chest drain' : ['A'], 'Place an abdominal drain' : ['A'], 'Give IV fluids' : ['C'], 'Give oxygen' : ['B','C'], 'Give electrolytes' : ['B','C'], 'Give antiarrhythmics' : ['B','C'], 'Give diuretics' : ['B','C'], 'Give antibiotics' : ['B','C'], 'Give nasal medications' : ['C'], 'Give pain relief' : ['C'], 'Sedate the patient' : ['A','B'], 'Intubate the patient' : ['A'], 'CT Scan' : ['D'], 'MRI Scan' : ['D'], 'Ultrasound Scan' : ['A','D'], 'Cardioversion' : ['B'], 'Thrombolysis' : ['B'], 'Prep for Theatre' : ['C'], 'Neurovascular Status' : ['B','C'], 'Wound Dressing' : ['C'], 'Patient Education' : ['A','B','C','D'], 'Prescribe Medications' : ['A','B'], 'Review Medications' : ['A','B'], 'Write Fluid Orders' : ['A','B'], 'Manual Handling' : ['C','D']}

const ImagePool = new WordPool(['injury.jpg', 'sick.jpg'])

const JobsA = new WordPool(['Chest X-ray', 'Lumbar Puncture', 'Take bloods', 'Send a urine sample', 'Send a sputum sample', 'Send a stool sample', 'Take and send a swab', 'Document allergies', 'Place a cannula', 'Place a catheter', 'Place a chest drain', 'Place an abdominal drain', 'Sedate the patient', 'Intubate the patient', 'Ultrasound Scan', 'Patient Education', 'Prescribe Medications', 'Review Medications', 'Write Fluid Orders',])
const JobsB = new WordPool(['Electrocardiogram', 'Take bloods', 'Send a urine sample', 'Send a sputum sample', 'Send a stool sample', 'Take and send a swab', 'Document allergies', 'Place a cannula', 'Give oxygen', 'Give electrolytes', 'Give antiarrhythmics', 'Give diuretics', 'Give antibiotics', 'Sedate the patient', 'Cardioversion', 'Thrombolysis', 'Neurovascular Status', 'Patient Education', 'Prescribe Medications', 'Review Medications', 'Write Fluid Orders'])
const JobsC = new WordPool(['Electrocardiogram', 'Take bloods', 'Send a urine sample', 'Send a sputum sample', 'Send a stool sample', 'Take and send a swab', 'Document allergies', 'Place a cannula', 'Place a catheter', 'Give IV fluids', 'Give oxygen', 'Give electrolytes', 'Give antiarrhythmics', 'Give diuretics', 'Give antibiotics', 'Give nasal medications', 'Give pain relief', 'Prep for Theatre', 'Neurovascular Status', 'Wound Dressing', 'Patient Education', 'Manual Handling'])
const JobsD = new WordPool(['Chest X-ray', 'Hip X-ray', 'Limb X-ray', 'Abdominal X-ray', 'Take bloods', 'Send a urine sample', 'Send a sputum sample', 'Send a stool sample', 'Take and send a swab', 'Document allergies', 'CT Scan', 'MRI Scan', 'Ultrasound Scan', 'Patient Education', 'Manual Handling'])
const JobsAll = new WordPool(['Take bloods', 'Send a urine sample', 'Send a sputum sample', 'Send a stool sample', 'Take and send a swab', 'Document allergies', 'Patient Education'])

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function findTasksForRole(role) {
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
      if (JobsPool[k] == 'A,B,C,D') {
        final.push(k)
       }
    }
  }

  final = shuffle(final)
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

function makePlausibleName() {  
  return FirstsPool.getWord() + ' ' + SursPool.getWord()
}

// Takes 2-4 jobs and creates a sequence from them, joined using AND, THEN, WHILE
function createJobSequence(jobs) {
  let result = ''

  for (let i = 0; i < jobs.length - 1; i++) {
    result += findTasksForRole(jobs[i]) + getRandomListEntry(JOINS) + '\n'
  }

  result += findTasksForRole(jobs[jobs.length - 1])

  return result
}

function createPatient(jobSeq, triage) {

  return {
    name: makePlausibleName(),
    triage,
    jobs: jobSeq.split('\n')
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

// console.dir(patients)
// patients.forEach(p => printPatient(p))
console.log(JSON.stringify(patients));
// console.log('AVG Triage: ', triages.reduce((acc, v) => acc + v, 0) / triages.length)

// function printPatient(patient) {
//   console.log(patient.triage)
//   console.log(patient.name)
//   console.log(patient.jobs)
//   console.log('')
// }