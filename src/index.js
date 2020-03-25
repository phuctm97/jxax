import { displayDialog } from './jxa/standardAddtions';

displayDialog(`Running in environment: ${process.env.NODE_ENV}`, {
    withTitle: 'DeskP',
    buttons: ['OK']
});
