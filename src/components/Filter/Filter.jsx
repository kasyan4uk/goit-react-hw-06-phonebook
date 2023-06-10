import { BsSearch } from 'react-icons/bs';
import { Input, LabelDescr } from './Filter.styled';
import { LabelWrapper } from 'components/ContactForm/ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';
import { setFilter } from 'redux/filter/filter-slice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(setFilter(e.target.value.toLowerCase().trim()));
  };

  return (
    <LabelDescr>
      <LabelWrapper>
        <BsSearch size="16" /> Find contacts by name
      </LabelWrapper>
      <Input type="text" value={filter} onChange={changeFilter} placeholder="search" />
    </LabelDescr>
  );
};
