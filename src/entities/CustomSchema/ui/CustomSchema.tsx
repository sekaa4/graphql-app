interface CustomSchemaProps {
  schema?: string;
}

export const CustomSchema = (props: CustomSchemaProps) => {
  const { schema } = props;

  return <div>{schema ? schema : 'Invalid schema, pls try one more time'}</div>;
};
