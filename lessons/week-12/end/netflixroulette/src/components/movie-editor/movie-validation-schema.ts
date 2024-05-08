import { array, date, number, object, string } from 'yup';

export const movieValidationSchema = object({
  title: string().required('Adja meg a film címét'),
  vote_average: number()
    .min(0, 'Legalább 0')
    .max(10, 'Legfeljebb 10'),
  poster_path: string()
    .required('Adja meg a film plakátjának elérését')
    .url('Hibás URL cím'),
  overview: string().required('Adja meg a film leírását'),
  genres: array().ensure()
    .typeError('Válasszon legalább 1 típust')
    .required('Válasszon legalább 1 típust')
    .min(1, 'Válasszon legalább 1 típust'),
  runtime: number()
    .integer()
    .typeError('Adja meg a film hosszát')
    .required('Adja meg a film hosszát')
    .min(0, 'Adja meg film percekben mért hosszát'),
  release_date: date().typeError('Adja meg a bemutató dátumát').required('Adja meg a bemutató dátumát')
});
