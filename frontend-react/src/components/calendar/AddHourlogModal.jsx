import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

const AddHourlogModal = ({ projects, open, setOpen }) => {
  return (
    <div>
      <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default AddHourlogModal
