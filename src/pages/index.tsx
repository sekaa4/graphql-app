import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Suspense, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import { auth, logout } from '@/app/components/FireBase';
import { CustomSchema, schemaActions } from '@/entities/CustomSchema';
import { DocumentSchemaLazy } from '@/entities/SideBar/ui/DocumentSchema.lazy';
import { fetchSchema } from '@/shared/api/fetchSchema';
import { Sidebar } from '@/widgets/layouts/side-bar';

const Home = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const schema = await fetchSchema();
      if (schema) {
        dispatch(schemaActions.addSchema(schema));
      }
    };

    fetch();
  }, [dispatch]);

  useEffect(() => {
    if (!user) router.push('/welcome');
  }, [router, user]);

  return (
    <>
      <Sidebar />
      <Button variant="contained" onClick={() => logout()}>
        LogOut
      </Button>

      <input className="graphql-input" />
      <div className="graphql-editor">
        <div className="graphql-textarea-wrapper">
          <textarea className="graphql-textarea"></textarea>
        </div>
        <div className="graphql-editor-right"></div>
      </div>
      {/* need draw when click on icon */}
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentSchemaLazy>
          <CustomSchema />
        </DocumentSchemaLazy>
      </Suspense>
    </>
  );
};

export default Home;
