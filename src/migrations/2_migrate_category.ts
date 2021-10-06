import connectToDb from '../configs/mongoose';
import { Category } from '../models';

connectToDb();

export const migrate = async (client: any, done: any) => {
  const category = [
    { name: 'Thiết Bị Điện Tử' },
    { name: 'TV & Thiết Bị Điện Gia Dụng' },
    { name: 'Sức Khoẻ & Làm Đẹp' },
    { name: 'Hàng Mẹ, Bé & Đồ Chơi' },
    { name: 'Siêu Thị Tạp Hoá' },
    { name: 'Hàng Gia Dụng Và Đời Sống' },
    { name: 'Thời Trang Nữ' },
    { name: 'Thời Trang Nam' },
    { name: 'Thể Thao & Du Lịch' },
    { name: 'Oto, Xe máy & Thiết Bị Định Vị' },
  ];

  await Category.insertMany(category);
  done();
};

export const rollback = async (client: any, done: any) => {
  done();
};
