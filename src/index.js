import { displayDialog } from 'jxax/core/standardAddtions';

displayDialog(`Running in environment: ${process.env.NODE_ENV}`, {
    withTitle: 'DeskP',
    buttons: ['OK']
});
