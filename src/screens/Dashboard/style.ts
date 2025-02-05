import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#1e1e1e',
    marginTop: 15,
  },
  inputLabel: {
    color: '#fff',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryHeader: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerItem: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6200ee',
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  picker: {
    color: '#fff',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200ee',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 6,
  },
  progressText: {
    position: 'absolute',
    right: 5,
    top: 0,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  timerCard: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6200ee',
  },
  labelText: {
    color: '#bbb',
    fontSize: 14,
  },
  valueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bulkActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  bulkActionButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  bulkActionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
