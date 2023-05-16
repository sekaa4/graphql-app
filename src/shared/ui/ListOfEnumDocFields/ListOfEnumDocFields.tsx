import { Maybe } from 'graphql/jsutils/Maybe';

interface ListOfEnumDocFieldsProps {
  name: string;
  description: Maybe<string>;
}

export const ListOfEnumDocFields = (props: ListOfEnumDocFieldsProps) => {
  const { name, description } = props;

  return (
    <li>
      <div>{description}</div>
      <div>
        <span>{name}</span>
      </div>
    </li>
  );
};
