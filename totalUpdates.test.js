//import render and screen from testing lab
import { render, screen } from "@testing-library/react";
//import user-event as we will intreact in our tests
import userEvent from "@testing-library/user-event";
import Options from '../Options';
import {OrderDetailsProvider} from '../Pages/OrderDetails';


test('update scoop subtotal when scoop change', async()=>{
//to make our test render App not just Options we use wrapper
render(<Options optionType="scoops"/>, {wrapper: OrderDetailsProvider});

//make sure total starts out 0.00
//get by text as it is display element, no role on the page
const scoopsSubtotal = screen.getAllByText('Scoops total: $',{exact: false}); 
expect(scoopsSubtotal).toHaveTextContent('0.00')

//update vanilla scoops to 1 and check the subtotal
//won't populate until we get options from the server
const vanillaInput = await screen.findByRole('spinbutton',{name: 'vanilla'} );

//when ever updating text element: best practice is to clear the element as we do't know whats in it
//then typpe in it
userEvent.clear(vanillaInput);
userEvent.type(vanillaInput, '1');//we give it  sting as user-event.type expects string

expect(scoopsSubtotal).toHaveTextContent('2.00');

//update chocolate scoops to 2 and check subtotal
const chocolateInput = await screen.findByRole('spinbutton',{name: 'chololate'});
userEvent.clear(chocolateInput);
userEvent.type(chocolateInput, '2');

expect(scoopsSubtotal).toHaveTextContent('6.00');


});





















