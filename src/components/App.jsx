import { useDispatch, useSelector } from "react-redux";
import { addContact } from "redux/contactSlice";
import { contactsSelector, filterSelector } from "redux/selectors";

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector)
  const filter = useSelector(filterSelector)
  console.log('222', contacts)
  console.log('333', filter)
  console.log('update', addContact(1))
  return (
    <div>
      <button type="button" onClick={() => dispatch(addContact({id: 'id-5', name: 'Stas', number: '42-44-344'}))}>Click</button>
    </div>
  );
};
