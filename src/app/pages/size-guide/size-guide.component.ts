import { Component, signal } from '@angular/core';

type Tab = 'women' | 'men' | 'kids';

@Component({
  selector: 'app-size-guide',
  template: `
    <section class="page-hero">
      <span class="eyebrow">Hỗ trợ</span>
      <h1>Hướng dẫn chọn size</h1>
      <p>Số đo tính bằng centimet (cm). Nếu nằm giữa hai size, hãy chọn size lớn hơn để thoải mái.</p>
    </section>

    <div class="wrap" style="max-width:900px;padding-top:48px;padding-bottom:80px;">
      <div class="size-tabs">
        <button [class.is-active]="tab() === 'women'" (click)="tab.set('women')">Nữ</button>
        <button [class.is-active]="tab() === 'men'" (click)="tab.set('men')">Nam</button>
        <button [class.is-active]="tab() === 'kids'" (click)="tab.set('kids')">Trẻ em</button>
      </div>

      <table class="size-table" [class.is-active]="tab() === 'women'">
        <thead><tr><th>Size</th><th>Ngực</th><th>Eo</th><th>Hông</th></tr></thead>
        <tbody>
          <tr><td>XS</td><td>78–82</td><td>60–64</td><td>84–88</td></tr>
          <tr><td>S</td><td>82–86</td><td>64–68</td><td>88–92</td></tr>
          <tr><td>M</td><td>86–90</td><td>68–72</td><td>92–96</td></tr>
          <tr><td>L</td><td>90–95</td><td>72–78</td><td>96–101</td></tr>
          <tr><td>XL</td><td>95–101</td><td>78–84</td><td>101–107</td></tr>
        </tbody>
      </table>

      <table class="size-table" [class.is-active]="tab() === 'men'">
        <thead><tr><th>Size</th><th>Ngực</th><th>Eo</th><th>Cổ</th></tr></thead>
        <tbody>
          <tr><td>S</td><td>88–94</td><td>74–80</td><td>37–38</td></tr>
          <tr><td>M</td><td>94–100</td><td>80–86</td><td>39–40</td></tr>
          <tr><td>L</td><td>100–106</td><td>86–92</td><td>41–42</td></tr>
          <tr><td>XL</td><td>106–112</td><td>92–98</td><td>43–44</td></tr>
          <tr><td>XXL</td><td>112–118</td><td>98–104</td><td>45–46</td></tr>
        </tbody>
      </table>

      <table class="size-table" [class.is-active]="tab() === 'kids'">
        <thead><tr><th>Size</th><th>Độ tuổi</th><th>Chiều cao</th><th>Cân nặng</th></tr></thead>
        <tbody>
          <tr><td>4</td><td>3–4 tuổi</td><td>98–104</td><td>14–16 kg</td></tr>
          <tr><td>6</td><td>5–6 tuổi</td><td>110–116</td><td>18–20 kg</td></tr>
          <tr><td>8</td><td>7–8 tuổi</td><td>122–128</td><td>23–26 kg</td></tr>
          <tr><td>10</td><td>9–10 tuổi</td><td>134–140</td><td>29–33 kg</td></tr>
          <tr><td>12</td><td>11–12 tuổi</td><td>146–152</td><td>36–41 kg</td></tr>
        </tbody>
      </table>

      <p class="size-note">Mẹo đo: dùng thước dây mềm, đo sát cơ thể nhưng không siết chặt. Đo vòng ngực tại điểm đầy nhất, vòng eo tại điểm nhỏ nhất.</p>
    </div>
  `,
})
export class SizeGuideComponent {
  readonly tab = signal<Tab>('women');
}
