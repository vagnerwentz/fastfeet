import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDate = (date, formatString) => {
  return date
    ? format(parseISO(date), formatString, { locale: ptBR })
    : '--/--/--';
};
