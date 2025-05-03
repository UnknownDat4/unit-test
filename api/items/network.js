const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, combustionConsumption, fuelConsumption, costElectricalKM} = require('../../calculators/environment')
const {calculateCircleArea} = require('../../calculators/circle.js')

const tableInjected = 'my_table'

router.get('/list', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.list(tableInjected);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})

router.get("/env_test/:fuel", async (req, res) => {

    const typeOfFuel = req.params.fuel
    const electrical_consumption = combustionConsumption(81.14, 200)
    const fuel_selector = fuelEnergySelector(typeOfFuel)
    const fuel_consumption = fuelConsumption(combustionConsumption, fuel_selector['fuel_energy'])
    try{
        const list = {
            'month_inflation': tiMonth(2.8),
            'fuel_selected': fuel_selector,
            'electrical_consumption': electrical_consumption,
            'cost_electrical_km': costElectricalKM(electrical_consumption, 238.25),
            'combustion_consumption': fuel_consumption
        }
        response.success(req, res, list, 200)
    } catch (error){
        response.error(req, res, error.message, 500);
    }
}) 


router.get('/list2', async (req, res) => {
    try {
        response.success(req, res, tiMonth(1.4), 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})

router.get('/area/:radius', async (req, res) => {
    try {
        const radiusParam = req.params.radius 
        response.success(req, res, calculateCircleArea(radiusParam), 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})




router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.listById(tableInjected, id);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.post('/add', async (req, res) => {
    try {
        await ctrl.addElement(tableInjected, data = {
            "data": req.body.data,
        });
        response.success(req, res, `Item Created`, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


router.put('/update', async (req, res) => {
    try {
        let { id, data } = req.body;
        await ctrl.updateElement(tableInjected, data = {
            "id": id,
            "data": data,
        });
        response.success(req, res, `Item updated`, 200);     
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


module.exports = router ;