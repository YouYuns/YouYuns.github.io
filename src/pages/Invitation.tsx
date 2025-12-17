import React from 'react';
interface FamilyInfoProps {
  dad: string;
  mom: string;
  child: string;
  relation: string;
}

// FamilyInfo를 Invitation 밖으로 이동
const FamilyInfo: React.FC<FamilyInfoProps> = ({ dad, mom, child, relation }) => {
  return (
    <div className='invitation__family'>
       <div className='invitation__parent'>
          {dad && mom ? (
            <div>{dad}·{mom}</div>
          ) : mom ? (
            <div>{mom}</div>
          ) : null}
      </div>
      <div>{relation}</div>
      <div className='invitation__child'>{child}</div>
    </div>
  );
};

const Invitation: React.FC = () => {

  return (
    <div className=' container'>
      <div className="contact__sub_title">Invite</div>
      <div className="contact__title">초대합니다</div>
    <div className='bc-pink'>
        <div className='invitation__content'>
          <div>지금까지 소중한 인연을 지켜왔습니다.</div>
          <div>앞으로 남은 인생은 가족이 되어 </div>
          <div>같은 곳을 바라보며</div>
          <div>함께 걷고자 합니다.</div>
          <div>두 사람의 새로운 시작을 </div>
          <div>함께 축복해주시면 감사하겠습니다. </div>
        </div>
        <div className='family__content'>
        <FamilyInfo dad="윤원근" mom="김경하" child="윤성호" relation="의 차남" />
        <FamilyInfo dad="" mom="김남선" child="최소리" relation="의 장녀" />
        </div>
      </div>
    </div>
  );
};

export default Invitation;
