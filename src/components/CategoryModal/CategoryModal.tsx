import React, { FC, memo, useCallback } from 'react';
import { FormControl, Modal, Input, Button } from 'native-base';
import { ValidationInput } from '@src/components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export const CategoryModal: FC<CategoryModalProps> = memo(
  ({ isOpen, onClose, onSubmit }) => {
    const { control, getValues, formState } = useForm<FieldValue>({
      mode: 'onChange',
      resolver: yupResolver(shema),
    });

    const submit = useCallback(() => {
      const { name } = getValues();
      onSubmit(name);
      onClose();
    }, []);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>カテゴリー名を入力</Modal.Header>
          <Modal.Body>
            <FormControl p={5}>
              <ValidationInput control={control} name="name" />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" onPress={onClose}>
                キャンセル
              </Button>
              <Button disabled={!formState.isValid} onPress={submit}>
                保存
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
);

type FieldValue = {
  name: string;
};

const shema = yup.object().shape({
  name: yup.string().required('この項目は必須です').trim(),
});
