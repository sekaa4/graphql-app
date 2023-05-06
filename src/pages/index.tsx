import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { CustomSchema, schemaActions } from '@/entities/CustomSchema';
import { SideBar } from '@/entities/SideBar';
import { fetchSchema } from '@/shared/api/fetchSchema';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const schema = await fetchSchema();
      if (schema) {
        dispatch(schemaActions.addSchema(schema));
      }
    };

    fetch();
  }, [dispatch]);

  return (
    <>
      <input className="graphql-input" />
      <div className="graphql-editor">
        <div className="graphql-textarea-wrapper">
          <textarea className="graphql-textarea"></textarea>
        </div>
        <div className="graphql-editor-right"></div>
      </div>
      <SideBar>
        <CustomSchema />
      </SideBar>
    </>
  );
};

export default Home;
