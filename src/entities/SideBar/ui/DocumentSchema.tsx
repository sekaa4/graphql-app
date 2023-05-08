import { PropsWithChildren } from 'react';

const SideBar = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div>
      <div>Docs </div>
      <div>A GraphQL schema provides a root type for each kind of operation.</div>
      {children}
    </div>
  );
};

export default SideBar;
