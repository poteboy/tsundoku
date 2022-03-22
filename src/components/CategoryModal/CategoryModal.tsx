import React, { FC, memo } from 'react';
import { FormControl, Modal, Input } from 'native-base';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  //   onSubmit: (title: string) => void;
};

export const CategoryModal: FC<CategoryModalProps> = memo(
  ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>カテゴリー名を入力</Modal.Header>
          <Modal.Body>
            <FormControl p={5}>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <></>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
);
