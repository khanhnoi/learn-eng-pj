import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Navbar from '../Landing/LandingNavbar';
import Footer from '../Landing/Footer';

const TermsDashboard = () => {
  const menus = [
    {
      id: 0,
      label: 'Về XAGOe',
      href: '/#ve-xagoe'
    },
    {
      id: 1,
      label: 'Tính năng',
      href: '/#tinh-nang'
    },
    {
      id: 2,
      label: 'Về chúng tôi',
      href: '/#ve-chung-toi'
    },
    {
      id: 3,
      label: 'Liên hệ',
      href: '/#lien-he'
    }
  ];

  return (
    <div className={cn(styles.termsContainer)}>
      <Navbar menus={menus} offHighLight />
      <div className={cn('container', styles.container)}>
        <div className="columns has-margin-y-0">
          <div
            className={cn('column is-8 is-offset-2', styles.contentContainer)}
          >
            <div className={cn(styles.title)}>ĐIỀU KHOẢN SỬ DỤNG</div>
            <div className={cn(styles.content)}>
              <p>
                Chào mừng bạn ghé thăm website{' '}
                <a href="https://xagoe.com">www.xagoe.com</a> của chúng tôi.
              </p>
              <p>
                Chúng tôi mong bạn vui lòng dành thời gian đọc và tìm hiểu những
                điều khoản về thỏa thuận pháp lý giữa bạn và CÔNG TY CỔ PHẦN TƯ
                VẤN DATAHOUSE ASIA (gọi tắt là DataHouse Asia) như dưới đây.
              </p>
              <p>
                Thông qua việc truy cập, duyệt nội dung, hoặc sử dụng bất kỳ nội
                dung, hình ảnh nào của trang thông tin điện tử này, bạn (người
                sử dụng) công nhận rằng bạn đã đọc, hiểu và nhất trí với việc
                tuân thủ các quy định của những điều khoản này. Nếu bạn không
                nhất trí với những điều khoản này, xin vui lòng không sử dụng
                trang thông tin điện tử này.
              </p>
              <p>
                DataHouse Asia chịu trách nhiệm đảm bảo tính hợp pháp của việc
                cung cấp nội dung trên website đến người sử dụng. Mọi thông tin,
                hình ảnh và toàn bộ nội dung được đăng tải trên website tuân thủ
                các quy định của pháp luật, và phù hợp với thuần phong mỹ tục
                Việt Nam.
              </p>

              <h1>1. Dữ liệu mở</h1>

              <p>
                Kho Dữ liệu của website{' '}
                <a href="https://xagoe.com">www.xagoe.com</a> được lấy từ Kho Dữ
                liệu mở thuộc đề án Hệ tri thức Việt số hóa là nguồn lực chiến
                lược quốc gia, với sự tham gia đóng góp bởi các Cơ quan Nhà
                nước, tổ chức, doanh nghiệp và mỗi người dân. Xem chi tiết về
                chính sách dữ liệu mở tại: https://itrithuc.vn/chinh-sach.html
              </p>
              <h1>2. Bản quyền và thương hiệu</h1>
              <p>
                Trang web này và tất cả nội dung của website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a>, bao gồm nhưng
                không giới hạn các văn bản, thiết kế, đồ họa, giao diện, hình
                ảnh, mã code đều thuộc bản quyền của DataHouse Asia hoặc bên thứ
                ba cấp phép cho DataHouse Asia. Bản quyền của{' '}
                <a href="https://xagoe.com">https://xagoe.com</a> được thể hiện
                trên website bằng dòng chữ ©2020 Bản quyền của CÔNG TY CỔ PHẦN
                TƯ VẤN DATAHOUSE ASIA.
              </p>
              <p>
                Bất kỳ nội dung nào thuộc website này bao gồm nhãn hiệu, tên
                thương mại, mẫu logo công ty hoặc sản phẩm, kiểu dáng sản phẩm…
                đều thuộc quyền sở hữu của DataHouse Asia và được bảo hộ theo
                quy định của Luật Sở hữu trí tuệ Việt Nam và các văn bản liên
                quan.
              </p>
              <p>
                Mọi hành vi sao chép, trích dẫn, sửa đổi, phân phối, xuất bản,
                lưu thông… vì mục đích thương mại và (hoặc) phi thương mại dưới
                mọi hình thức mà không được sự chấp thuận trước bằng văn bản của
                DataHouse Asia là xâm phạm quyền của DataHouse Asia. DataHouse
                Asia có quyền yêu cầu người sử dụng chấm dứt việc sử dụng và bồi
                thường thiệt hại (nếu có).
              </p>
              <h1>3. Quyền và trách nhiệm của DataHouse Asia</h1>
              <p>
                DataHouse Asia có quyền thay đổi và/hoặc chấm dứt các nội dung,
                tính năng của một phần hay toàn bộ website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a> mà không cần
                thông báo trước với người sử dụng.
              </p>
              <p>
                DataHouse Asia có quyền thực hiện các biện pháp an ninh để bảo
                vệ và chống lại các truy cập trái phép hoặc sửa đổi trái phép,
                tiết lộ hoặc phá hủy thông tin trên website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a>.
              </p>
              <p>
                Khi sử dụng website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a>, thông tin sẽ
                được truyền qua một phương tiện/thiết bị nằm ngoài sự kiểm soát
                của DataHouse Asia. Theo đó, DataHouse Asia không chịu trách
                nhiệm cho hoặc liên quan đến bất kỳ sự chậm trễ, thất bại, bị
                gián đoạn của bất kỳ dữ liệu hoặc các thông tin khác được truyền
                trong kết nối với việc sử dụng của website.
              </p>
              <p>
                Thông tin cá nhân như địa chỉ, email, số điện thoại của người sử
                dụng website <a href="https://xagoe.com">https://xagoe.com</a>{' '}
                (do người sử dụng tự nguyện cung cấp bằng các hình thức khác
                nhau trên website) có thể được sử dụng nội bộ cho mục đích nâng
                cấp các sản phẩm, dịch vụ của DataHouse Asia.
              </p>
              <p>
                DataHouse Asia cam kết không chủ động tiết lộ bất kỳ thông tin
                nào của người sử dụng cho bên thứ ba, ngoại trừ trường hợp có
                yêu cầu bằng văn bản của các đơn vị điều tra theo đúng luật pháp
                hiện hành. Khi đó, DataHouse Asia sẽ thông báo tới người sử dụng
                bằng văn bản. Tuy nhiên, mặc dù có các công nghệ bảo mật và hệ
                thống cũng được trang bị rất nhiều tính năng bảo mật, nhưng
                không một dữ liệu nào được truyền trên đường truyền internet mà
                có thể được bảo mật 100%. Do vậy, DataHouse Asia không thể đưa
                ra một cam kết chắc chắn rằng thông tin bạn cung cấp cho chúng
                tôi sẽ được bảo mật một cách tuyệt đối, và cũng sẽ không chịu
                trách nhiệm trong trường hợp có sự truy cập trái phép thông tin
                cá nhân của người sử dụng. Tất cả các thông tin, tài liệu không
                mang tính chất riêng tư được người sử dụng đưa lên website đều
                không được xem là thông tin mật, DataHouse Asia được phép toàn
                quyền sử dụng hay chuyển tải cho bất kỳ mục đích nào.
              </p>
              <p>
                DataHouse Asia được phép sử dụng bất kỳ ‎ý tưởng hay khái niệm
                nào mà bạn đã đưa lên website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a> cho tất cả các
                mục đích không giới hạn, bao gồm cả việc phát triển, sản xuất
                hay tiếp thị sản phẩm. DataHouse Asia không có trách nhiệm phải
                bồi thường hay thưởng cho người cung cấp.
              </p>
              <p>
                Bạn phải ‎ý thức và bảo đảm những thông tin, tài liệu mà bạn gửi
                phải nằm trong quyền hạn sử dụng của bạn; điều đó có nghĩa
                DataHouse Asia sẽ không vi phạm bất cứ quyền lợi nào của bên thứ
                ba.
              </p>
              <p>
                DataHouse Asia có quyền từ chối một số tài liệu bạn gửi mà không
                bắt buộc phản hồi lý do.
              </p>
              <h1>4. Quyền và trách nhiệm của người sử dụng</h1>
              <p>
                DataHouse Asia cho phép người sử dụng xem, chiết xuất thông tin
                trên website (in, tải, chuyển tiếp…) hoặc chia sẻ cho người khác
                nhưng chỉ cho mục đích sử dụng cá nhân và phi thương mại với
                điều kiện phải trích dẫn thông báo bản quyền sau đây:{' '}
                <b>©2020 Bản quyền của CÔNG TY CỔ PHẦN TƯ VẤN DATAHOUSE ASIA</b>
                .
              </p>
              <p>
                Bạn đảm bảo tuân theo pháp luật và các quy định liên quan đến
                việc sử dụng website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a> của DataHouse
                Asia; Không can thiệp, gây ảnh hưởng đến việc sử dụng website
                của những người sử dụng khác; Không can thiệp vào hoạt động và
                quản lý website của DataHouse Asia.
              </p>
              <p>
                Bạn nhận thức rõ và chấp nhận rằng DataHouse Asia và/hoặc các
                công ty thành viên/đơn vị trực thuộc /nhân viên DataHouse Asia
                không chịu trách nhiệm đối với bất kỳ tổn thất, thiệt hại, chi
                phí phát sinh từ bất kỳ quyết định nào của bạn khi sử dụng bất
                kỳ thông tin nào trên website với bất kỳ nguyên nhân gì.
              </p>
              <p>
                Nếu bạn không bằng lòng với bất kỳ thông tin nào trên Website
                hoặc với bất kỳ điều khoản và điều kiện sử dụng thông tin trên
                Website này thì phương thức duy nhất bạn nên thực hiện là chấm
                dứt truy cập/sử dụng thông tin trên website.
              </p>
              <h1>5. Quy định chung</h1>
              <p>Điều khoản sử dụng được điều chỉnh bởi pháp luật Việt Nam.</p>
              <p>
                Một điều khoản sử dụng bị vô hiệu theo quyết định của tòa án có
                thẩm quyền sẽ không ảnh hưởng đến tính hiệu lực của các điều
                khoản còn lại.
              </p>
              <p>
                DataHouse Asia luôn hoan nghênh những ý kiến/góp ý của bạn về
                nội dung website. Nếu có một phần nào đó của website này mà bạn
                cho rằng đã có dấu hiệu vi phạm bản quyền của bên thứ ba, vui
                lòng gửi thông tin tới info@xagoe.com.
              </p>
              <p>
                Thông báo này và tất cả các điều khoản sử dụng tạo thành toàn bộ
                thỏa thuận giữa DataHouse Asia và bạn liên quan đến việc sử dụng
                các thông tin trên website. DataHouse Asia có thể điều chỉnh nội
                dung thông báo này bất cứ lúc nào bằng cách cập nhật lên website{' '}
                <a href="https://xagoe.com">https://xagoe.com</a>. Bạn nên
                thường xuyên truy cập website để theo dõi các quy định ràng buộc
                này khi sử dụng.
              </p>
            </div>
            <div className={cn(styles.signature)}>BAN QUẢN TRỊ</div>
          </div>
        </div>

        <Footer />
      </div>
      <div className={cn()}></div>
    </div>
  );
};

export default TermsDashboard;
