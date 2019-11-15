import React, {Component} from "react";
import {Table, Button, Form} from 'react-bootstrap';
import {AppDB} from "./db-init.js";
class Budget extends Component{
   constructor(props){
       super(props);
       this.state = {
           Description: "",
           Amount : 0,
           Date: "",
           Category: "",
           totalExpense: 0,
           myExpense: [],
           userSelections: []
       }
   }
   render() {
       return <div>
       <h2>Budget Page</h2>
       <Form>
           <Form.Label>Description</Form.Label>
           <Form.Control type="text" name="Description" value={this.state.Description} onChange={(ev) => this.updateFormData(ev)}/>
           <Form.Label>Amount</Form.Label>
           <Form.Control type="number" name="Amount" value={this.state.Amount} onChange={(ev) => this.updateFormData(ev)}></Form.Control>
           <Form.Label>Date</Form.Label>
           <Form.Control type="Date" name="Date" value={this.state.Date} onChange={(ev) => this.updateFormData(ev)}></Form.Control>
           <Form.Label>Category</Form.Label>
           <Form.Control as="select" multiple  name="Category" value={this.state.Category} onChange={(ev) => this.updateFormData(ev)}>
               <option>Food</option>
               <option>Gas</option>
               <option>Travel</option>
           </Form.Control>
       </Form>
       <Button variant="outline-primary" onClick={() => this.submit()}>Add</Button>
       <Table striped bordered hover variant="dark">
           <thead>
           <tr>
               <th>Description</th>
               <th>Amount</th>
               <th>Date</th>
               <th>Category</th>
           </tr>
           </thead>
           <tbody class = "hover">
               { this.state.myExpense.map(myExpense =>
                   <tr key={myExpense.mykey}>
                       <td>{myExpense.description}</td>
                       <td>{myExpense.amount}</td>
                       <td>{myExpense.date}</td>
                       <td>{myExpense.category}</td>
                       <td>

                                <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.selectionHandler} />

                       </td>
                   </tr>)}
               
                   <tr>
                                <td colSpan="3">Total</td>
                               <td>{this.state.totalExpense}</td>
                            </tr>
           
           
           
           </tbody>
       </Table>
       </div>;
   }
   updateFormData(ev){
       if(ev.target.type === 'number')
           this.setState({[ev.target.name] : Number(ev.target.value)});
       else
           this.setState({[ev.target.name] : ev.target.value});
   }
   componentDidMount(){
       AppDB.ref("budget").on('child_added', (s) => this.fbAddHandler(s));
       AppDB.ref("budget").on('child_removed', (s) => this.fbRemoveHandler(s));
   }
   submit() {
       AppDB.ref("budget")
       .push()
       .set({
           description: this.state.Description,
           amount: this.state.Amount,
           date: this.state.Date,
           category: this.state.Category
       });
   }
   fbAddHandler(s){
       const item = s.val();
       const newArr = this.state.myExpense.slice(); /* create a copy */
       newArr.push({...item, mykey:s.key});  /* add a new item */
       const newTotal = this.state.totalExpense + Number(item.amount);
       this.setState({myExpense: newArr, totalExpense: newTotal})
       console.log(this.state.totalExpense);
   }
   fbRemoveHandler(s){
       const item = s.val();
       const newArr = this.state.myExpense.slice(); /* create a copy */
       newArr.pop({...item, mykey:s.key});  /* pop the item from the array */
       const newTotal = this.state.totalExpense - Number(item.amount);
       this.setState({myExpense: newArr, totalExpense: newTotal})
   }

   selectionHandler(changeEvent){
    const whichKey = changeEvent.target.id;
    if (changeEvent.target.checked) {
        /* add the selected key to the array */
        this.state.userSelections.push(whichKey);
    } else {
        /* remove the deselected key from the array */
        this.state.userSelections = this.state.userSelections.filter(x=>{if(x==whichKey) return true 
        else return false; 
        });
    }   
}
removeExpenseItem(){
    /* snapshot.key will hold the key of the item being REMOVED */
    this.state.userSelections.forEach((victimKey) =>{
        AppDB.ref('budget').child(victimKey).remove();
    })
}
delete(snapshot){
    this.myExpense = this.myExpense.filter(z => z.key != snapshot.key);
}

}
export default Budget;