import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import Spinner from '../../components/Common/Spinner';
import { Profile, Achievements } from '../../components/Profile';
import {
  getUserById,
  updateUserInfo,
  getUserStats,
  getUserStatsById
} from '../../services/user';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import { getSignedURL, uploadFile, transformFile } from '../../services/misc';
import { withAuthenticatedUser } from '../../services/auth';
import withNotificationModal from '../../components/HOCComponent/WithNotificationModal';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';
import ErrorDashboard from '../../components/ErrorDashboard';

export default withAuthenticatedUser(
  withNotificationModal(
    withQuestionAgent(({ animationOff }) => {
      const router = useRouter();
      const [data, setData] = useState({});
      const [achivements, setAchivements] = useState({});
      const [loading, setLoading] = useState(false);
      const [editable, setEditable] = useState(false);
      const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);
      const [show404, setShow404] = useState(false);
      const { updateUser } = User.useContainer();

      const showErrorToast = (message) => toast.error(message);

      const queryCurrenUser = async () => {
        try {
          const stats = await getUserStats();
          setAchivements(stats.data);
          setCheckingRoomAvailable(false);
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      };

      const queryUserData = async (id) => {
        try {
          const res = await getUserById(id);
          setData(res.data);
          const stats = await getUserStatsById(id);
          setAchivements(stats.data);
          setCheckingRoomAvailable(false);
        } catch (error) {
          handleLocalError(error);
        } finally {
          setLoading(false);
        }
      };

      const handleLocalError = (error) => {
        const code = error?.response?.data?.code;
        if (code === 'E__NOT_FOUND_ERROR' || code === 'E__INVALID_PARAMETER') {
          setShow404(true);
        } else {
          handleError(error);
        }
      };

      useEffect(() => {
        const localUser = localStorage.getItem('user');
        let localId = '';
        if (localUser) {
          setData(JSON.parse(localUser));
          localId = JSON.parse(localUser).id + '';
        }

        if (router.query.id === 'me' || router.query.id === localId) {
          queryCurrenUser();
          setEditable(true);
        } else {
          queryUserData(router.query.id);
        }
      }, []);

      const handleUpdateUser = async (params) => {
        try {
          const res = await updateUserInfo(params);
          localStorage.setItem('user', JSON.stringify(res.data));
          setData(res.data);
          updateUser(res.data);
        } catch (error) {
          console.log('error', error);
        }
      };

      const handleUpdateData = (params) => {
        setData((curData) => ({ ...curData, ...params }));
        handleUpdateUser(params);
      };

      const handleGetSignedUrl = async (file) => {
        try {
          const res = await getSignedURL({
            name: `${new Date().getTime()}-${file.name}`,
            contentType: file.type
          });
          return res.data.url;
        } catch (error) {
          handleError(error);
        }
      };

      const [uploading, setUploading] = useState(false);
      const handleUploadFile = async (fileList) => {
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
        const file = fileList[0];

        if (!file) return;

        const isJpgOrPng =
          file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
          showErrorToast('Bạn chỉ có thể chọn file với định dạng JPG hoặc PNG');
          return;
        }

        if (file.size >= MAX_FILE_SIZE) {
          showErrorToast('Kích thước file quá lớn');
          return;
        }

        const newFile = await transformFile(file);

        try {
          setUploading(true);
          const url = await handleGetSignedUrl(newFile);
          await uploadFile(url, newFile);
          const fileUrl = url.split('?')[0];
          handleUpdateData({ avatar: fileUrl });
        } catch (error) {
          handleError(error);
        } finally {
          setUploading(false);
        }
      };

      if (show404) return <ErrorDashboard />;
      if (checkingRoomAvailable) return <Spinner showLogo enable />;

      return (
        <Layout isOrange animationOff={animationOff}>
          <div className="columns has-margin-0">
            <div className="column is-9">
              {loading ? (
                <Spinner enable isLocal></Spinner>
              ) : (
                <Profile
                  data={data}
                  editable={editable}
                  onUpdate={handleUpdateData}
                  onUploadFile={handleUploadFile}
                  uploading={uploading}
                  animationOff={animationOff}
                ></Profile>
              )}
            </div>
            <div className="column is-3">
              {loading ? (
                <Spinner enable isLocal isDark></Spinner>
              ) : (
                <Achievements
                  data={achivements}
                  animationOff={animationOff}
                ></Achievements>
              )}
            </div>
          </div>
        </Layout>
      );
    })
  )
);
