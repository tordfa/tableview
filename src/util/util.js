
export function closeTableModal(){
    let tableModal = document.getElementById('tablemodal');
    tableModal.close();
}

export function openTableModal(){
    let tableModal = document.getElementById('tablemodal');
    tableModal.showModal();
}

export function isTableOpen(){
    let tableModal = document.getElementById('tablemodal');
    return tableModal.open
}