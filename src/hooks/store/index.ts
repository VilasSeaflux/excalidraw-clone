import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState, AppDispatch, AppStore } from '@/lib/store/index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();