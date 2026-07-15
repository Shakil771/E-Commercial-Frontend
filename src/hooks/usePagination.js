import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page'), 10) || 1;

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { page, setPage };
};

export default usePagination;
