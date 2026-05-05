interface User {
    login: string;
    email: string;
    password: string;
    isOnline: boolean;
    lastVisited: Date;
}

interface Admin {
    login: string;
    email: string;
    password: string;
    isOnline: boolean;
    lastVisited: Date;
    role: string;
}

function login(info: {login: string, password: string}) : void{
    if (info.login !== "" && info.password !== '') {
        console.log('Hello, user');
        
    }
}

type Level = 'junior' | 'middle' | 'senior';
 
interface Developer {
  login: string,
  skills: string[],
  level: Level, 
}
 
// create a function that change level of incoming developer
function gradeDeveloper(developer: Developer, nextLevel: Level) {
    if (developer.level !== nextLevel) 
        developer.level = nextLevel
    console.log(developer);
    

}
let Alex: Developer = {
    login: "kukareku",
    skills: ['f', 'g'],
    level: 'junior',
}
gradeDeveloper(Alex, 'middle')


interface IProduct {
    price: number;
    isNew: boolean;
    isSale?: boolean;
    title: string;
}

interface IVehicle {
    wheels: number;
    year: Date;
    brand: string;
}

interface ICar extends IProduct, IVehicle {
    type: string;
    model: string;
}

type Product = {
     price: number;
    isNew: boolean;
    isSale?: boolean;
    title: string;
}

type Vehicle = {
    wheels: number;
    year: Date;
    brand: string;
}

type Car = {
    type: string;
    model: string;
} & Product & Vehicle

// let Lamba : Car  = {type: "d", model: 'r', }

interface Order {
  address: string;
}
interface TelephoneOrder extends Order {
  callerNumber: string;
}
interface InternetOrder extends Order {
  email: string;
}

type PossibleOrders = TelephoneOrder | InternetOrder | undefined;

function isAnInternetOrder(order: PossibleOrders): order is InternetOrder {
    return (order as InternetOrder).email !== undefined
}

function isATelephoneOrder(order: PossibleOrders): order is TelephoneOrder {
    return (order as TelephoneOrder).callerNumber !== undefined
}

function makeOrder(order: PossibleOrders) {
  if (isAnInternetOrder(order)) {
    console.log(order.email);
  } else if (isATelephoneOrder(order)) {
    console.log(order.callerNumber);
  }
}

function head(value: number[]): number;
function head(value: string): string;
function head(value: boolean[]): boolean;


function head(value: any): any {
  return value[0];
}

let nu= head([5,4])
nu + 