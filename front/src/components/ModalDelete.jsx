import { Dialog } from "@headlessui/react";

const ModalDelete = ({ isOpen, onClose, onConfirm, user }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white text-black p-6 space-y-4">
          <Dialog.Title className="text-lg font-bold">
            ¿Eliminar usuario?
          </Dialog.Title>
          <Dialog.Description>
            Esta acción eliminará a <strong>{user?.name}</strong> de forma
            permanente.
          </Dialog.Description>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirmar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalDelete;
