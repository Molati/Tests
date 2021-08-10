import { render, screen } from '../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../OrderDetails';
import Options from '../Options'
//import { element } from 'prop-types';



test('display image for each scoop option from server', async ()=>{
 render(<Options optionType="scoops"/>);

 //find images
 const scoopImage = await screen.findAllByRole('img',{name: /scoop$/i});
 expect(scoopImage).toHaveLength(2);

 //confirm alt text of images
 //@ts-ignore
 const altText = scoopImage.map((element) => element.alt);
 expect(altText).toEqual(['chocolate scoop', 'vanilla scoop']);



});

test('Display image for each toppings option from server', async()=>{

    //service worker will return three topping from server
    render(<Options optionType="toppings"/>);

    //find images expect 3 based on what msw returns
    const images = await screen.findAllByRole('img', {name: /topping$/i});
    expect(images).toHaveLength(3);


    const imagesTitles = images.map((img) => img.alt);    
    expect(imagesTitles).toEqual([
        'Cherries topping',
        'M&Ms topping',
        'Hot fudge topping',
    ]);


});

test("don't update total if scoops is invalid", async()=>{
 render(<Options optionType="scoops" />);

 //expect button tobe enabled after adding scoop
 const vanillaInput = await screen.findAllByRole('spinbutton',{

    name: 'Vanilla',
 });
 userEvent.clear(vanillaInput);
 userEvent.optionType(vanillaInput, '-1');

 //make sure scroops subtotal hasn't update
 const scoopsSubtotal = screen.getByText('Scoops Total:$0.00');
 expect(scoopsTotal).toBeInTheDocument();

});
 









