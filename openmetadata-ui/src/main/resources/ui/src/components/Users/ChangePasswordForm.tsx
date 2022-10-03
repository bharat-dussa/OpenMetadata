/*
 *  Copyright 2022 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { Form, Input, Modal } from 'antd';
import React from 'react';
import { passwordErrorMessage } from '../../constants/error-message';
import { passwordRegex } from '../../constants/regex.constants';
import { ChangePasswordRequest } from '../../generated/auth/changePasswordRequest';

type ChangePasswordForm = {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: ChangePasswordRequest) => void;
  isLoggedinUser: boolean;
};

const ChangePasswordForm: React.FC<ChangePasswordForm> = ({
  visible,
  onCancel,
  onSave,
  isLoggedinUser,
}) => {
  const [form] = Form.useForm();
  const newPassword = Form.useWatch('newPassword', form);

  return (
    <Modal
      centered
      okButtonProps={{
        form: 'change-password-form',
        type: 'primary',
        htmlType: 'submit',
      }}
      okText="Update Password"
      title="Change Password"
      visible={visible}
      width={500}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}>
      <Form
        form={form}
        id="change-password-form"
        layout="vertical"
        name="change-password-form"
        validateMessages={{ required: '${label} is required' }}
        onFinish={onSave}>
        {isLoggedinUser && (
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input.Password
              data-testid="name"
              placeholder="Enter old Password"
            />
          </Form.Item>
        )}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
            },
            {
              pattern: passwordRegex,
              message: passwordErrorMessage,
            },
          ]}>
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[
            {
              validator: (_, value) => {
                if (value !== newPassword) {
                  return Promise.reject("Password doesn't match");
                }

                return Promise.resolve();
              },
            },
          ]}>
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordForm;
