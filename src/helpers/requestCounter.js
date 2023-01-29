import firestore from '../fireconf'

let counterObj ={day:0, value:0}
export default{

    async increment() {
        this.getData()
        firestore.write(counterObj.day == new Date().getDate() ? counterObj.value+1 : 0, new Date().getDate())
        this.getData()
    },
    async getData(){
        counterObj = await firestore.read() 
        return counterObj
    },
    // TODO
    // async listenData(){
    //     counterObj = firestore.listen();
    //     console.log(counterObj)
    //     return counterObj;
    // }
}