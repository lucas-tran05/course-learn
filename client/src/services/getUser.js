


const listUserProfile = () => {
  return (
    [
      {
        nameUser: 'ADMIN',
        email: 'admin@admin',
        username: 'admin',
        class: '',
        birth: '',
        phone: '',
        address: '',
        stuID: 'admin',
        gender: 'true',
        role: 0,
      },
      {
        nameUser: 'Trần Quốc Cường',
        email: 'cuongtq.b23at034@stu.ptit.edu.vn',
        username: 'trancuongk5',
        class: 'D23CQAT04-B',
        birth: '2005-11-13',
        phone: '0389433762',
        address: 'Bắc Giang',
        stuID: 'B23DCAT034',
        gender: 'true',
        role: 1,
        avatar: 'https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/442503721_961537172340504_6188785727214342475_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9PYIyRfN_3EQ7kNvgH-PODn&_nc_ht=scontent.fhan5-10.fna&oh=00_AYD1gn26cPwBdgrVwhmFoJOz-GXrov3NHrYLlJ7RvxNFzQ&oe=6663C299'
      },
      {
        nameUser: 'User test',
        email: 'test@example.com',
        username: 'testuser',
        class: 'CNTT',
        birth: '2005-10-01',
        phone: '0123458832',
        address: 'BG',
        stuID: '123456987',
        gender: 'false',
        role: 1
      }
    ]
  )
}
export {listUserProfile }